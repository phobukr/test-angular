

import { provideRouter } from '@angular/router';
import { TaskManagerMainScreenComponent } from './task-manager-main-screen/task-manager-main-screen.component';
import { TaskManagerCreateTaskComponent } from './task-manager-create-task/task-manager-create-task.component';
import { TaskManagerEditTaskComponent } from './task-manager-edit-task/task-manager-edit-task.component';

const appRoutes = [
  { path: 'tasks', component: TaskManagerMainScreenComponent },
  { path: 'tasks/create', component: TaskManagerCreateTaskComponent },
  { path: 'tasks/:id/edit', component: TaskManagerEditTaskComponent }
];

export const appRouter = provideRouter(appRoutes);