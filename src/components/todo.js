class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getInfo() {
    return [this.name, this.priority, this.dueDate];
  }
}

export default Todo;
