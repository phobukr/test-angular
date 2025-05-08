

import { bootstrapApplication, provideEnvironment } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideEnvironment(environment)
  ]
});