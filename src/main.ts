

import { bootstrapApplication } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TaskManagerMainScreenComponent } from './app/components/task-manager-main-screen/task-manager-main-screen.component';

bootstrapApplication(AppComponent, { providers: [TaskManagerMainScreenComponent] });