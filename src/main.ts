

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routerConfig } from './app/app.config';

bootstrapApplication(AppComponent, {providers: [routerConfig]});
