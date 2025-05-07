

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

  tasks: any[] = [];
  taskList: any[] = [];
  selectedTask: any = null;
  selectedFilter: string = 'All';
  newTaskPriority: string = 'High';
  newTaskName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleStatus(): void {
    const status = this.selectedTask.status;
    this.selectedTask.status = status === 'TODO' ? 'DONE' : 'TODO';
  }

  onDelete(): void {
    const taskName = this.selectedTask.name;
    const index = this.taskList.findIndex(t => t.name === taskName);
    if (index !== -1) {
      this.taskList.splice(index, 1);
    }
    this.refreshTable();
  }

  onMoveDown(): void {
    const taskName = this.selectedTask.name;
    const index = this.taskList.findIndex(t => t.name === taskName);
    if (index !== -1 && index < this.taskList.length - 1) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index + 1, 0, this.selectedTask);
    }
    this.refreshTable();
  }

  onMoveUp(): void {
    const taskName = this.selectedTask.name;
    const index = this.taskList.findIndex(t => t.name === taskName);
    if (index !== -1 && index > 0) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index - 1, 0, this.selectedTask);
    }
    this.refreshTable();
  }

  onMarkDone(): void {
    const taskName = this.selectedTask.name;
    const task = this.taskList.find(t => t.name === taskName);
    if (task && task.status !== 'DONE') {
      task.status = 'DONE';
    }
    this.refreshTable();
  }

  onApplyFilter(): void {
    this.refreshTable();
  }

  onAddTask(): void {
    const newTask = {
      name: this.newTaskName.trim(),
      priority: this.newTaskPriority,
      status: 'TODO'
    };
    if (newTask.name) {
      this.taskList.push(newTask);
      this.newTaskName = '';
    }
    this.refreshTable();
  }

  onRowSelect(task: any): void {
    this.selectedTask = task;
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return '';
    }
  }

  getSelectedColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'darkred';
      case 'Medium':
        return 'darkyellow';
      case 'Low':
        return 'darkgreen';
      default:
        return '';
    }
  }

  onFilterSelect(filter: string): void {
    this.selectedFilter = filter;
    this.onApplyFilter();
  }

  refreshTable(): void {
    this.tasks = [];
    if (this.selectedFilter === 'All') {
      this.tasks = this.taskList.map(task => ({ ...task }));
    } else if (this.selectedFilter === 'TODO') {
      this.tasks = this.taskList.filter(task => task.status === 'TODO').map(task => ({ ...task }));
    } else if (this.selectedFilter === 'DONE') {
      this.tasks = this.taskList.filter(task => task.status === 'DONE').map(task => ({ ...task }));
    }
  }

}
