class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getInfo() {
    return {
      title: this.title,
      priority: this.priority,
      dueDate: this.dueDate,
    };
  }
}

export default Todo;
