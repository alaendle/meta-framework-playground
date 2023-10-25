import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    template: `<div>
      <h1>{{ data }}</h1>
    </div>`,
  })
  export class HeaderComponent {
    static clientProviders = [provideHttpClient()];
    static renderProviders = [HeaderComponent.clientProviders];
    http = inject(HttpClient);
    data: string;

  constructor() {
    this.getData().subscribe((data) => this.data = data.title);
  }

  getData() {
      //this.http.get('/api/me', {  // relative URLS should be supported with angular 17
      return this.http.get<{ title:string }>('https://jsonplaceholder.typicode.com/todos/1', {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json'
      })
  };
  }