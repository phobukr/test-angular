

import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-manager-main-screen',
  templateUrl: './task-manager-main-screen.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgForOf
  ],
  styleUrls: ['./task-manager-main-screen.component.css']
})
export class TaskManagerMainScreenComponent implements OnInit {

  taskList: Task[] = [];
  tasks: any;
  taskCountLabel: any;
  filterComboBox: any;
  priorityComboBox: any;
  taskNameField: any;
  selectedTask: Task | null = null;
  filter: string = "All";
  newTaskPriority: string = "High";
  newTaskName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'TODO' ? 'DONE' : 'TODO';
    this.refreshTable();
  }

  deleteTask(): void {
    this.taskList = this.taskList.filter(t => t !== this.selectedTask);
    this.refreshTable();
  }

  moveDown(): void {
    if (!this.selectedTask) return
    const index = this.taskList.indexOf(this.selectedTask);
    if (index < this.taskList.length - 1) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index + 1, 0, this.selectedTask);
    }
    this.refreshTable();
  }

  moveUp(): void {
    if (!this.selectedTask) return
    const index = this.taskList.indexOf(this.selectedTask);
    if (index > 0) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index - 1, 0, this.selectedTask);
    }
    this.refreshTable();
  }

  markDone(): void {
    if (!this.selectedTask) return
    this.selectedTask.status = 'DONE';
    this.refreshTable();
  }

  applyFilter(): void {
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
    if (this.filter != "All") {
      this.tasks = this.taskList.filter(task => task.status === this.filter);
    } else {
      this.tasks = this.taskList;
    }
    this.taskCountLabel = this.tasks.length;
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
