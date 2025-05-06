

import { provideRouter } from '@angular/router';
import { TaskManagerMainScreenComponent } from './components/task-manager-main-screen/task-manager-main-screen.component';

const routes = [
  { path: 'task-manager', component: TaskManagerMainScreenComponent }
];

provideRouter(routes);