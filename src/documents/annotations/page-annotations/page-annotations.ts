import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, fromEvent, switchMap } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AnnotationService } from '../annotation.service';
import { TextAnnotationComponent } from '../text-annotation/text-annotation';

@Component({
  selector: 'app-page-annotations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextAnnotationComponent],
  templateUrl: './page-annotations.html',
})
export class PageAnnotations {
  documentId = input.required<string>();
  pageNumber = input.required<number>();
  scale = input<number>(1);
  readonly annotationService = inject(AnnotationService);
  private readonly host = inject(ElementRef);
  readonly pageAnnotations = computed(() =>
    this.annotationService.getByPage(this.documentId(), this.pageNumber())
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    const hostEl = this.host.nativeElement as HTMLElement;

    fromEvent<MouseEvent>(hostEl, 'mousedown').pipe(
      filter(e => e.detail < 2),
      switchMap(down => {
        const box = (down.target as HTMLElement).closest<HTMLElement>('[data-annotation-id]');
        const id = box?.dataset['annotationId'];
        const annotation = id ? this.annotationService.annotations().find(a => a.id === id) : undefined;
        if (!box || !annotation) return EMPTY;

        down.preventDefault();
        const container = hostEl.firstElementChild as HTMLElement;
        const rect = container.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const maxX = Math.max(0, 1 - boxRect.width / rect.width);
        const maxY = Math.max(0, 1 - boxRect.height / rect.height);
        const startX = down.clientX;
        const startY = down.clientY;
        const originX = annotation.x;
        const originY = annotation.y;

        return fromEvent<MouseEvent>(document, 'mousemove').pipe(
          filter(e => Math.abs(e.clientX - startX) >= 3 || Math.abs(e.clientY - startY) >= 3),
          map(e => ({
            id: annotation.id,
            x: Math.min(maxX, Math.max(0, originX + (e.clientX - startX) / rect.width)),
            y: Math.min(maxY, Math.max(0, originY + (e.clientY - startY) / rect.height)),
          })),
          takeUntil(fromEvent(document, 'mouseup')),
        );
      }),
      takeUntilDestroyed(destroyRef),
    ).subscribe(({ id, x, y }) => this.annotationService.move(id, x, y));
  }

  onDblClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target !== event.currentTarget) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    this.annotationService.addText(this.documentId(), this.pageNumber(), x, y);
  }
}
