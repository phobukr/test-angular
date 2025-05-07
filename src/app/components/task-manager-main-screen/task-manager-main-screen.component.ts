

import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-manager-main-screen',
  templateUrl: './task-manager-main-screen.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./task-manager-main-screen.component.css']
})
export class TaskManagerMainScreenComponent implements OnInit {

  tasks: any[] = [];
  taskCountLabel: string = 'Task Count: 0';
  filterComboBox: string[] = ['All', 'TODO', 'DONE'];
  priorityComboBox: string[] = ['Low', 'Medium', 'High'];
  filter: string = 'All';
  newTaskName: string = '';
  newTaskPriority: string = '';
  selectedTask: any | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  refreshTable(): void {
    this.taskCountLabel = `Task Count: ${this.tasks.length}`;
  }

  addTask(): void {
    const newTask: any = {
      name: this.newTaskName,
      priority: this.newTaskPriority,
      status: 'TODO'
    };
    this.tasks.push(newTask);
    this.refreshTable();
  }

  deleteTask(): void {
    if (this.selectedTask) {
      const index: number = this.tasks.indexOf(this.selectedTask);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.refreshTable();
      }
    }
  }

  moveUp(): void {
    if (this.selectedTask) {
      const index: number = this.tasks.indexOf(this.selectedTask);
      if (index > 0) {
        this.tasks.splice(index, 1);
        this.tasks.splice(index - 1, 0, this.selectedTask);
        this.refreshTable();
      }
    }
  }

  moveDown(): void {
    if (this.selectedTask) {
      const index: number = this.tasks.indexOf(this.selectedTask);
      if (index < this.tasks.length - 1) {
        this.tasks.splice(index, 1);
        this.tasks.splice(index + 1, 0, this.selectedTask);
        this.refreshTable();
      }
    }
  }

  markDone(): void {
    if (this.selectedTask) {
      this.selectedTask.status = 'DONE';
      this.refreshTable();
    }
  }

  applyFilter(): void {
    if (this.filter === 'TODO') {
      this.tasks = this.tasks.filter(task => task.status === 'TODO');
    } else if (this.filter === 'DONE') {
      this.tasks = this.tasks.filter(task => task.status === 'DONE');
    } else {
      this.tasks = this.tasks;
    }
    this.refreshTable();
  }

  toggleStatus(): void {
    if (this.selectedTask) {
      this.selectedTask.status = this.selectedTask.status === 'TODO' ? 'DONE' : 'TODO';
      this.refreshTable();
    }
  }

  onTaskSelected($event: MouseEvent, task: any) {
    this.selectedTask = task
  }
}
