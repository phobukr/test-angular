

import { Component } from '@angular/core';
import { TaskManagerMainScreenComponent } from './components/task-manager-main-screen/task-manager-main-screen.component';
import { RouterModule } from './app.routes';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { }