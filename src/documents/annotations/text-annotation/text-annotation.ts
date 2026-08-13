import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextAnnotation } from '../annotation.model';

@Component({
  selector: 'app-text-annotation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgClass],
  templateUrl: './text-annotation.html',
})
export class TextAnnotationComponent {
  annotation = input.required<TextAnnotation>();
  scale = input<number>(1);
  textChange = output<string>();
  remove = output<void>();

  @ViewChild('textarea') private textareaRef?: ElementRef<HTMLTextAreaElement>;

  editing = false;
  readonly boxClass = 'border border-blue-400 rounded py-0.5 text-sm bg-white/90 shadow min-w-[80px] max-w-[300px] max-h-[200px] overflow-auto';

  startEdit(event: MouseEvent): void {
    event.stopPropagation();
    this.editing = true;
    setTimeout(() => this.textareaRef?.nativeElement.focus(), 0);
  }
}

