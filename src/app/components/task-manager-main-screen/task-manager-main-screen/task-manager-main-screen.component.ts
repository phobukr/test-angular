

import { Component } from '@angular/core';

@Component({
  selector: 'app-task-manager-main-screen',
  templateUrl: './task-manager-main-screen.component.html',
  styleUrls: ['./task-manager-main-screen.component.css']
})
export class TaskManagerMainScreenComponent {
  tasks: any[] = [];
  filter: string;

  onApplyFilter(): void {
    const selectedFilter = this.filterComboBox.selectedItem;
    if (selectedFilter !== 'All') {
      const filteredTasks = this.tasks.filter(task => task.status === selectedFilter);
      this.tasks = filteredTasks;
      this.taskCountLabel = `Tasks (${filteredTasks.length})`;
    } else {
      this.tasks = this.tasks;
      this.taskCountLabel = `Tasks (${this.tasks.length})`;
    }
  }
}