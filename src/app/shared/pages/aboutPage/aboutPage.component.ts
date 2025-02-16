import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-about-page',
  standalone: false,
  // imports: [],
  templateUrl: './aboutPage.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent { }
