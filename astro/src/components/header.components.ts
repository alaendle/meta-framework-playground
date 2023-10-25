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
    this.data = "Hallo?";
    this.getData().then((data) => this.data = data.title);  // both calls seem to be needed!?
  }

  ngOnInit() {
    this.getData().then((data) => this.data = data.title);  // both calls seem to be needed!?
  }

  async getData(): Promise<any> {
    return await firstValueFrom(
      //this.http.get('/api/me', {  // relative URLS should be supported with angular 17
      this.http.get('https://jsonplaceholder.typicode.com/todos/1', {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json'
      })
    );
  };
  }