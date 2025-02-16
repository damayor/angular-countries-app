import { Component } from '@angular/core';

@Component({
  selector: 'shared-contact-page',
  // standalone: true,
  // imports: [],
  templateUrl: './contactPage.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ContactPageComponent { }
