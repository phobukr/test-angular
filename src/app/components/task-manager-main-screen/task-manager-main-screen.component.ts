

taskList: any[] = [];
taskTable: any;
tableModel: any;
taskCountLabel: string = '';
filterComboBox: any;
priorityComboBox: any;
taskNameField: any;
selectedTaskIndex: number = -1;
filteredTasks: any[] = [];
tasks: any[] = [];
filter: string = '';
priority: string = '';
taskName: string = '';

toggleStatus(): void {
  const status = this.taskList[this.selectedTaskIndex].status;
  if (status === 'TODO') {
    this.taskList[this.selectedTaskIndex].status = 'DONE';
  } else {
    this.taskList[this.selectedTaskIndex].status = 'TODO';
  }
}

onDelete(): void {
  const selectedRow = this.taskTable.getSelectedRow();
  if (selectedRow !== -1) {
    const taskName = this.tableModel.getValueAt(selectedRow, 0);
    this.taskList = this.taskList.filter(task => task.name !== taskName);
    this.refreshTable();
  }
}

onMoveDown(): void {
  const selectedRow = this.taskTable.getSelectedRow();
  if (selectedRow !== -1 && selectedRow < this.taskList.length - 1) {
    const taskName = this.tableModel.getValueAt(selectedRow, 0);
    const index = this.taskList.findIndex(task => task.name === taskName);
    if (index !== -1) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index + 1, 0, this.taskList[index]);
      this.refreshTable();
      this.taskTable.selectRow(selectedRow + 1);
    }
  }
}

onMoveUp(): void {
  const selectedRow = this.taskTable.getSelectedRow();
  if (selectedRow > 0) {
    const taskName = this.tableModel.getValueAt(selectedRow, 0);
    const index = this.taskList.findIndex(task => task.name === taskName);
    if (index > 0) {
      this.taskList.splice(index, 1);
      this.taskList.splice(index - 1, 0, this.taskList[index]);
      this.refreshTable();
      this.taskTable.selectRow(selectedRow - 1);
    }
  }
}

onMarkDone(): void {
  const selectedRow = this.taskTable.getSelectedRow();
  if (selectedRow !== -1) {
    const taskName = this.tableModel.getValueAt(selectedRow, 0);
    const task = this.taskList.find(task => task.name === taskName);
    if (task && task.status !== 'DONE') {
      task.status = 'DONE';
      this.refreshTable();
    }
  }
}

onApplyFilter(): void {
  const filterValue = this.filterComboBox.getSelectedItem();
  if (filterValue !== 'All') {
    this.filteredTasks = this.tasks.filter(task => task.status === filterValue);
    this.taskTable.clear();
    this.taskTable.addRows(this.filteredTasks);
    this.taskCountLabel = `Tasks: ${this.filteredTasks.length}`;
  } else {
    this.taskTable.clear();
    this.taskTable.addRows(this.tasks);
    this.taskCountLabel = `Tasks: ${this.tasks.length}`;
  }
}

onAddTask(): void {
  const taskName = this.taskNameField.getText().trim();
  const priority = this.priorityComboBox.getSelectedItem();
  if (taskName !== '') {
    const newTask = { name: taskName, priority, status: 'TODO' };
    this.tasks.push(newTask);
    this.taskNameField.setText('');
    this.refreshTable();
  }
}

getPriorityClass(priority: string): string {
  switch (priority) {
    case 'High':
      return 'high-priority';
    case 'Medium':
      return 'medium-priority';
    case 'Low':
      return 'low-priority';
    default:
      return '';
  }
}

onTaskSelected(index: number): void {
  this.selectedTaskIndex = index;
}

refreshTable(): void {
  this.tableModel.setRowCount(0);
  const filterValue = this.filterComboBox.getSelectedItem();
  if (filterValue !== 'All') {
    this.filteredTasks = this.tasks.filter(task => task.status === filterValue);
  } else {
    this.filteredTasks = this.tasks;
  }
  this.tableModel.addRows(this.filteredTasks);
  this.taskCountLabel = `Tasks: ${this.filteredTasks.length}`;
}

addTask(): void {
  const name = this.taskNameField.getText().trim();
  const priority = this.priorityComboBox.getSelectedItem();
  if (name !== '') {
    const newTask = { name, priority, status: 'TODO' };
    this.taskList.push(newTask);
    this.taskNameField.setText('');
    this.refreshTable();
  }
}