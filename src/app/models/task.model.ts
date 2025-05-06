

export class Task {
  name: string;
  priority: string;
  status: string;

  constructor(name: string, priority: string, status: string) {
    this.name = name;
    this.priority = priority;
    this.status = status;
  }

  update(name: string, priority: string, status: string): void {
    this.name = name;
    this.priority = priority;
    this.status = status;
  }
}