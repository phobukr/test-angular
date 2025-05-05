

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-manager-main-screen',
  templateUrl: './task-manager-main-screen.component.html',
  styleUrls: ['./task-manager-main-screen.component.css']
})
export class TaskManagerMainScreenComponent implements OnInit {

  status: string = '';
  tasks: any[] = [];
  taskName: string = '';
  priority: string = '';
  selectedTask: any;
  taskPriorityColors: any = { 'High': 'rgb(255, 204, 204)', 'Medium': 'rgb(255, 255, 204)', 'Low': 'rgb(204, 255, 204)' }
  filter: string = 'All';

  constructor() { }

  ngOnInit(): void {
  }

  toggleStatus(): void {
    if (this.status === 'TODO') {
      this.status = 'DONE';
    } else {
      this.status = 'TODO';
    }
  }

  onDelete(): void {
    const selectedRow = this.tasks.indexOf(this.selectedTask);
    if (selectedRow !== -1) {
      this.tasks.splice(selectedRow, 1);
      this.refreshTable();
    }
  }

  onMoveDown(): void {
    const selectedRow = this.tasks.indexOf(this.selectedTask);
    if (selectedRow !== -1 && selectedRow < this.tasks.length - 1) {
      const task = this.tasks[selectedRow];
      this.tasks.splice(selectedRow, 1);
      this.tasks.splice(selectedRow + 1, 0, task);
      this.refreshTable();
      this.selectedTask = this.tasks[selectedRow + 1];
    }
  }

  onMoveUp(): void {
    const selectedRow = this.tasks.indexOf(this.selectedTask);
    if (selectedRow > 0) {
      const task = this.tasks[selectedRow];
      this.tasks.splice(selectedRow, 1);
      this.tasks.splice(selectedRow - 1, 0, task);
      this.refreshTable();
      this.selectedTask = this.tasks[selectedRow - 1];
    }
  }

  onMarkDone(): void {
    const selectedRow = this.tasks.indexOf(this.selectedTask);
    if (selectedRow !== -1) {
      const task = this.tasks[selectedRow];
      if (task.status !== 'DONE') {
        task.status = 'DONE';
        this.refreshTable();
      }
    }
  }

  onAddTask(): void {
    const name = this.taskName.trim();
    if (name === '') return;
    const priority = this.priority;
    const task = { name, priority, status: 'TODO' };
    this.tasks.push(task);
    this.taskName = '';
    this.refreshTable();
  }

  onTaskSelected(event: any, task: any): void {
    this.selectedTask = task;
    event.target.style.background = this.getTaskPriorityColor(task.priority);
  }

  getTaskPriorityColor(priority: string): string {
    return this.taskPriorityColors[priority];
  }

  onFilterChange(event: any): void {
    this.filter = event.target.value;
    this.onApplyFilter();
  }

  onApplyFilter(): void {
    if (this.filter === 'All') {
      this.tasks = this.tasks;
    } else if (this.filter === 'TODO') {
      this.tasks = this.tasks.filter(task => task.status === 'TODO');
    } else if (this.filter === 'DONE') {
      this.tasks = this.tasks.filter(task => task.status === 'DONE');
    }
    this.updateTaskCountLabel();
  }

  updateTaskCountLabel(): void {
    const taskCount = this.tasks.length;
    document.getElementById('taskCountLabel').innerHTML = 'Tasks: ' + taskCount;
  }

  refreshTable(): void {
    const table = document.getElementById('taskTable');
    table.innerHTML = '';
    const headerRow = table.insertRow(0);
    const headers = ['Name', 'Priority', 'Status'];
    headers.forEach(header => {
      const headerCell = headerRow.insertCell();
      headerCell.innerHTML = header;
    });
    this.tasks.forEach(task => {
      const row = table.insertRow();
      const cells = [task.name, task.priority, task.status];
      cells.forEach(cell => {
        const cellElement = row.insertCell();
        cellElement.innerHTML = cell;
      });
    });
  }

}