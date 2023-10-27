import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { client } from 'src/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public counter: number = 0;
  data: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId : Object
  ) {
    this.data = "";

    if (isPlatformServer(this.platformId)) {
      // only on server
    }
    else {
      // only on client
      const globalAny = global as any;
      globalAny.WebSocket = WebSocket;
      
      client().onAdd.subscribe(undefined, { onData(d) { console.log(d); }});
    }
    
    //this.getData().then((data) => this.data = data.title);
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

  // https://github.com/angular/angular/issues/51626
  // still a problem for caching!
  public reload() {
    this.getData().then((data) => this.data = data.title);
  }

  public increment() {
    this.counter++;
    return this.counter;
  }

  public decrement() {
    this.counter--;
    return this.counter;
  }

  public reset() {
    this.counter = 0;
    return this.counter;
  }
}
