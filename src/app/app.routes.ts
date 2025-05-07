

import { Route } from '@angular/router';
import { TaskManagerMainScreenComponent } from './components/task-manager-main-screen/task-manager-main-screen.component';

export const ROUTES: Route[] = [
  {
    path: '/task-manager',
    component: TaskManagerMainScreenComponent
  }
];