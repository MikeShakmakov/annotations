import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from '../document-resolver';
import { IconButton } from '../../app/icon-button/icon-button';
import { AnnotationService } from '../annotations/annotation.service';
import { PageAnnotations } from '../annotations/page-annotations/page-annotations';

@Component({
  selector: 'app-document',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconButton, PageAnnotations],
  templateUrl: './document.html',
  styleUrl: './document.css',
})
export class Document {
  private readonly route = inject(ActivatedRoute);
  readonly documentId = this.route.snapshot.paramMap.get('id')!;
  data = this.route.snapshot.data['document'] as DocumentData;
  readonly annotationService = inject(AnnotationService);
  scale = 1;
  readonly baseWidth = 800;

  zoomIn(): void {
    this.scale = Math.min(3, +(this.scale + 0.25).toFixed(2));
  }

  zoomOut(): void {
    this.scale = Math.max(0.25, +(this.scale - 0.25).toFixed(2));
  }

  save(): void {
    console.log({
      document: this.data,
      annotations: this.annotationService.getByDocument(this.documentId),
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.alt = `Page not found`;
    img.style.visibility = 'hidden';
  }
}
