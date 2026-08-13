import { Injectable, signal } from '@angular/core';
import { Annotation, TextAnnotation } from './annotation.model';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  readonly annotations = signal<Annotation[]>([]);

  addText(documentId: string, pageNumber: number, x: number, y: number): void {
    const annotation: TextAnnotation = {
      id: crypto.randomUUID(),
      type: 'text',
      documentId,
      pageNumber,
      x,
      y,
      text: '',
    };
    this.annotations.update(list => [...list, annotation]);
  }

  move(id: string, x: number, y: number): void {
    this.annotations.update(list =>
      list.map(a => (a.id === id ? { ...a, x, y } : a))
    );
  }

  remove(id: string): void {
    this.annotations.update(list => list.filter(a => a.id !== id));
  }

  updateText(id: string, text: string): void {
    this.annotations.update(list =>
      list.map(annotation => (annotation.id === id && annotation.type === 'text' ? { ...annotation, text } : annotation))
    );
  }

  getByPage(documentId: string, pageNumber: number): Annotation[] {
    return this.annotations().filter(
      a => a.documentId === documentId && a.pageNumber === pageNumber
    );
  }

  getByDocument(documentId: string): Annotation[] {
    return this.annotations().filter(a => a.documentId === documentId);
  }
}
