import Todo from './todo';

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  getTodos() {
    return this.todos;
  }

  addTodo(title) {
    this.todos.push(new Todo(title));
  }

  setActive() {
    this.active = true;
  }

  setInactive() {
    this.active = false;
  }
}

export default Project;
