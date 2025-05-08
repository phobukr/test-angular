

import { Component } from '@angular/core';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  providers: [TaskManagerComponent]
})
export class AppComponent { }