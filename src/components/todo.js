class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  getInfo() {
    return {
      title: this.title,
      priority: this.priority,
      description: this.description,
      dueDate: this.dueDate,
    };
  }
}

export default Todo;
