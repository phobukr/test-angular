

import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskList: Task[] = [];
  private tasks: Task[] = [];
  private taskTable: any;

  getTaskList(): Task[] {
    return this.taskList;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  updateTaskStatus(task: Task, status: string): void {
    task.status = status;
    this.updateTasks(this.tasks);
  }

  filterTasks(status: string): void {
    this.tasks = this.tasks.filter(task => task.status === status);
    this.updateTaskTable();
  }

  updateTaskTable(): void {
    this.taskTable = this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.updateTasks(this.tasks);
  }

  updateTasks(tasks: Task[]): void {
    this.tasks = tasks;
    this.updateTaskTable();
  }

  refreshTable(): void {
    this.taskTable = this.tasks;
  }

  deleteTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.updateTasks(this.tasks);
    }
  }

}