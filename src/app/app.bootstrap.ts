

import { bootstrapApplication } from '@angular/core';
import { AppComponent } from './app.component';
import { providers } from './app.providers';

bootstrapApplication(AppComponent, {
  providers: providers
});