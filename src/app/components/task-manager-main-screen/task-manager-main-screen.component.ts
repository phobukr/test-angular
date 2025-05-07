

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-manager-main-screen',
  templateUrl: './task-manager-main-screen.component.html',
  styleUrls: ['./task-manager-main-screen.component.css']
})
export class TaskManagerMainScreenComponent implements OnInit {

  taskList: Task[] = [];
  taskTable: any;
  taskCountLabel: any;
  filterComboBox: any;
  priorityComboBox: any;
  taskNameField: any;
  selectedTask: Task;
  filter: string;
  newTaskPriority: string;
  newTaskName: string;

  constructor() { }

  ngOnInit(): void {
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'TODO' ? 'DONE' : 'TODO';
    this.refreshTable();
  }

  deleteTask(task: Task): void {
    this.taskList = this.taskList.filter(t => t !== task);
    this.refreshTable();
  }

  moveDown(task: Task): void {
    const index = this.taskList.indexOf(task);
    if (index < this.taskList.length - 1) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index + 1, 0, task);
    }
    this.refreshTable();
  }

  moveUp(task: Task): void {
    const index = this.taskList.indexOf(task);
    if (index > 0) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index - 1, 0, task);
    }
    this.refreshTable();
  }

  markDone(task: Task): void {
    task.status = 'DONE';
    this.refreshTable();
  }

  applyFilter(filter: string): void {
    this.filter = filter;
    this.refreshTable();
  }

  addTask(): void {
    if (this.newTaskName && this.newTaskPriority) {
      const newTask = new Task(this.newTaskName, this.newTaskPriority, 'TODO');
      this.taskList.push(newTask);
      this.refreshTable();
    }
  }

  refreshTable(): void {
    if (this.filter) {
      this.taskTable = this.taskList.filter(task => task.status === this.filter);
    } else {
      this.taskTable = this.taskList;
    }
    this.taskCountLabel = this.taskTable.length;
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
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
}