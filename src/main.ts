

import { bootstrapApplication } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TaskService } from './app/services/task.service';

bootstrapApplication(AppComponent, {
  providers: [TaskService]
});