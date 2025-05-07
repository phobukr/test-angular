

import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  title = 'Task Manager';
  routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
    { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) }
  ];
}