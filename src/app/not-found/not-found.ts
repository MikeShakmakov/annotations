import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],

  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Document not found.</p>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 8px;
    }
    h1 { font-size: 4rem; margin: 0; }
  `],
})
export class NotFound {}
