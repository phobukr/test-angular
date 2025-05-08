

import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements AfterViewInit {
  selectedRow: number | null = null;
  tasks: any[] = [];
  selectedTask: any = null;
  filter: string = 'All';
  taskCount: number = 0;
  newTaskName: string = '';
  newTaskPriority: string = '';

  ngAfterViewInit(): void {
    this.updateTaskCount();
  }

  onDelete(): void {
    if (this.selectedRow !== null) {
      this.tasks.splice(this.selectedRow, 1);
      this.selectedRow = null;
      this.updateTaskCount();
    }
  }

  refreshTable(): void {
    this.tasks = [...this.tasks];
  }

  onRowSelect(row: number): void {
    this.selectedRow = row;
  }

  onRowDeselect(): void {
    this.selectedRow = null;
  }

  onMoveDown(): void {
    if (this.selectedRow !== null && this.selectedRow < this.tasks.length - 1) {
      const temp = this.tasks[this.selectedRow];
      this.tasks[this.selectedRow] = this.tasks[this.selectedRow + 1];
      this.tasks[this.selectedRow + 1] = temp;
      this.selectedRow++;
    }
  }

  onMoveUp(): void {
    if (this.selectedRow !== null && this.selectedRow > 0) {
      const temp = this.tasks[this.selectedRow];
      this.tasks[this.selectedRow] = this.tasks[this.selectedRow - 1];
      this.tasks[this.selectedRow - 1] = temp;
      this.selectedRow--;
    }
  }

  onMarkDone(): void {
    if (this.selectedRow !== null) {
      this.tasks[this.selectedRow].done = true;
    }
  }

  onAddTask(): void {
    this.addTask();
  }

  onFilterSelect(): void {
    this.tasks = this.tasks.filter(task => task.priority === this.filter || this.filter === 'All');
  }

  updateTaskCount(): void {
    this.taskCount = this.tasks.length;
  }

  findTaskIndex(name: string): number {
    return this.tasks.findIndex(task => task.name === name);
  }

  toggleStatus(): void {
    if (this.selectedRow !== null) {
      this.tasks[this.selectedRow].done = !this.tasks[this.selectedRow].done;
    }
  }

  addTask(): void {
    const newTask = { name: this.newTaskName, priority: this.newTaskPriority, done: false };
    this.tasks.push(newTask);
    this.newTaskName = '';
    this.newTaskPriority = '';
    this.updateTaskCount();
  }
}