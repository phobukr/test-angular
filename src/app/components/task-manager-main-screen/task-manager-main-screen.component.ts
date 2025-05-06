

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-task-manager-main-screen',
  templateUrl: './task-manager-main-screen.component.html',
  styleUrls: ['./task-manager-main-screen.component.css']
})
export class TaskManagerMainScreenComponent {
  @ViewChild('taskTable') taskTable: ElementRef;
  @ViewChild('tableModel') tableModel: ElementRef;
  @ViewChild('taskList') taskList: ElementRef;
  @ViewChild('filterComboBox') filterComboBox: ElementRef;
  @ViewChild('taskCountLabel') taskCountLabel: ElementRef;
  @ViewChild('taskNameField') taskNameField: ElementRef;
  @ViewChild('priorityComboBox') priorityComboBox: ElementRef;
  @ViewChild('tasks') tasks: ElementRef;

  tableModelValue: any;
  taskListArray: Task[] = [];
  tasksArray: Task[] = [];
  filterComboBoxValue: string;

  constructor() { }

  onDelete() {
    const selectedRow = this.taskTable.nativeElement.selectedRow;
    if (selectedRow !== -1) {
      const taskName = this.tableModel.nativeElement.getTaskName(selectedRow);
      const taskIndex = this.taskListArray.findIndex(task => task.name === taskName);
      if (taskIndex !== -1) {
        this.taskListArray.splice(taskIndex, 1);
        this.refreshTable();
      }
    }
  }

  onMoveDown() {
    const selectedRow = this.taskTable.nativeElement.selectedRow;
    if (selectedRow !== -1 && selectedRow < this.taskListArray.length - 1) {
      const taskName = this.tableModel.nativeElement.getTaskName(selectedRow);
      const taskIndex = this.taskListArray.findIndex(task => task.name === taskName);
      if (taskIndex !== -1) {
        const task = this.taskListArray.splice(taskIndex, 1)[0];
        this.taskListArray.splice(taskIndex + 1, 0, task);
        this.refreshTable();
        this.taskTable.nativeElement.selectRow(selectedRow + 1);
      }
    }
  }

  onMoveUp() {
    const selectedRow = this.taskTable.nativeElement.selectedRow;
    if (selectedRow > 0) {
      const taskName = this.tableModel.nativeElement.getTaskName(selectedRow);
      const taskIndex = this.taskListArray.findIndex(task => task.name === taskName);
      if (taskIndex !== -1) {
        const task = this.taskListArray.splice(taskIndex, 1)[0];
        this.taskListArray.splice(taskIndex - 1, 0, task);
        this.refreshTable();
        this.taskTable.nativeElement.selectRow(selectedRow - 1);
      }
    }
  }

  onMarkDone() {
    const selectedRow = this.taskTable.nativeElement.selectedRow;
    if (selectedRow !== -1) {
      const taskName = this.tableModel.nativeElement.getTaskName(selectedRow);
      const task = this.taskListArray.find(task => task.name === taskName);
      if (task && task.status !== 'DONE') {
        task.toggleStatus();
        this.refreshTable();
      }
    }
  }

  onApplyFilter() {
    const filterValue = this.filterComboBox.nativeElement.value;
    if (filterValue !== 'All') {
      this.tasksArray = this.taskListArray.filter(task => task.status === filterValue);
    } else {
      this.tasksArray = this.taskListArray;
    }
    this.updateTaskCountLabel();
    this.updateTaskTable();
  }

  onAddTask() {
    const taskName = this.taskNameField.nativeElement.value.trim();
    const priority = this.priorityComboBox.nativeElement.value;
    if (taskName !== '') {
      const task = new Task(taskName, priority, 'TODO');
      this.tasksArray.push(task);
      this.taskNameField.nativeElement.value = '';
      this.refreshTable();
    }
  }

  updateTaskCountLabel() {
    this.taskCountLabel.nativeElement.textContent = `Tasks: ${this.tasksArray.length}`;
  }

  updateTaskTable() {
    this.taskTable.nativeElement.innerHTML = '';
    this.tasksArray.forEach(task => {
      const row = this.taskTable.nativeElement.insertRow();
      row.insertCell().textContent = task.name;
      row.insertCell().textContent = task.priority;
      row.insertCell().textContent = task.status;
    });
  }

  refreshTable() {
    const filterValue = this.filterComboBox.nativeElement.value;
    if (filterValue !== 'All') {
      this.tasksArray = this.taskListArray.filter(task => task.status === filterValue);
    } else {
      this.tasksArray = this.taskListArray;
    }
    this.updateTaskCountLabel();
    this.updateTaskTable();
  }

  addTask() {
    const taskName = this.taskNameField.nativeElement.value.trim();
    const priority = this.priorityComboBox.nativeElement.value;
    if (taskName !== '') {
      const task = new Task(taskName, priority, 'TODO');
      this.tasksArray.push(task);
      this.taskNameField.nativeElement.value = '';
      this.refreshTable();
    }
  }
}

class Task {
  name: string;
  priority: string;
  status: string;

  constructor(name: string, priority: string, status: string) {
    this.name = name;
    this.priority = priority;
    this.status = status;
  }

  toggleStatus() {
    if (this.status.equals('TODO')) {
      this.status = 'DONE';
    } else {
      this.status = 'TODO';
    }
  }
}
```