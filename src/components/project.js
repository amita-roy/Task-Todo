import Todo from './todo';

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  getName() {
    return this.name;
  }

  getTodos() {
    return this.todos;
  }

  addTodo(title, description, priority, dueDate) {
    this.todos.push(new Todo(title, description, priority, dueDate));
  }

  setActive() {
    this.active = true;
  }

  setInactive() {
    this.active = false;
  }
}

export default Project;
