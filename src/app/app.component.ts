

import { Component } from '@angular/core';
import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = AppConfig.title;
  routes = AppConfig.routes;
}