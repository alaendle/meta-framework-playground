import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    template: `<div>
      <h1>{{ title }}</h1>
      <p>New Blog Post</p>
    </div>`,
  })
  export class HeaderComponent {
    @Input() title: string | undefined;
  }