

import { Route } from '@angular/router';
import { TaskManagerMainScreenComponent } from './components/task-manager-main-screen/task-manager-main-screen.component';

export const routes: Route[] = [
  {
    path: 'task-manager',
    component: TaskManagerMainScreenComponent
  }
];