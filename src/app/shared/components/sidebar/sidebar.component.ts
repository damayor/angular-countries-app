import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  standalone: false,
  // imports: [],
  templateUrl: './sidebar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SidebarComponent { }
