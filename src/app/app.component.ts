

import { Component } from '@angular/core';
import { TaskManagerMainScreenComponent } from './components/task-manager-main-screen/task-manager-main-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskManagerMainScreenComponent = TaskManagerMainScreenComponent;
}