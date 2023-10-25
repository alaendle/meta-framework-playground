import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <a href="https://analogjs.org/" target="_blank">
        <img alt="Analog Logo" class="logo analog" src="/analog.svg" />
      </a>
    </div>

    <h2>Analog</h2>

    <h3>The fullstack meta-framework for Angular!</h3>

    <div class="card">
      <button type="button" (click)="increment()">Count {{ count }}</button>
    </div>
    <h3>{{ data }}</h3>

    <p class="read-the-docs">
      For guides on how to customize this project, visit the
      <a href="https://analogjs.org" target="_blank">Analog documentation</a>
    </p>
  `,
  styles: [
    `
      .logo {
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.angular:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
      }
      .read-the-docs {
        color: #888;
      }
    `,
  ],
})
export default class HomeComponent {
  count = 0;
  data: string;

  increment() {
    this.count++;
    this.getData().then((data) => this.data = data.title);
  }

  constructor(
    private http: HttpClient
  ) {
    this.data = "";
    this.getData().then((data) => this.data = data.title);
  }

  async getData(): Promise<any> {
    return await firstValueFrom(
      //this.http.get('/api/v1/hello', {  // relative URLS should be supported with angular 17
      this.http.get('https://jsonplaceholder.typicode.com/todos/1', {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json'
      })
    );
  };
}
