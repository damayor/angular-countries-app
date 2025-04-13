import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-about-page',
  standalone: false,
  templateUrl: './aboutPage.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AboutPageComponent { }
