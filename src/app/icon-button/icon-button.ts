import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'button[appIconButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<ng-content />`,

  host: {
    class: 'w-8 h-8 border border-gray-300 rounded bg-gray-100 cursor-pointer hover:bg-gray-200 disabled:opacity-40 disabled:cursor-default',
  },
})
export class IconButton {}
