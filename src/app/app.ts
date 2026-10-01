import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component: an empty shell. Build the app layout (toolbar, navigation) here and add pages as
 * lazy routes in app.routes.ts.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'app' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
