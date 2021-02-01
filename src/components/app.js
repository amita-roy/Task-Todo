import Project from './project';

class App {
  constructor() {
    // dummy data
    const description = 'Add the description of your todo';
    const priority = 'high';
    const dueDate = '2021-02-02';

    const p1 = new Project('Project 1');
    p1.addTodo('Todo 1', description, dueDate, priority);
    p1.addTodo('Todo 2', description, dueDate, 'low');
    p1.addTodo('Todo 3', description, dueDate, 'medium');

    const p2 = new Project('Project 2');
    p2.addTodo('Todo 4', description, dueDate, 'low');
    p2.addTodo('Todo 5', description, dueDate, 'medium');

    const p3 = new Project('Project 3');
    p3.addTodo('Todo 6', description, dueDate, 'low');

    this.projects = [p1, p2, p3];
    this.activeProjectIndex = 0;
  }

  static loadFromLocalStorage() {
    const data = localStorage.getItem('data');
    const app = new App();
    if (!data) {
      return app;
    }

    const json = JSON.parse(data);
    app.activeProjectIndex = json.activeProjectIndex;
    app.projects = json.projects.map((p) => Project.fromJSON(p));
    return app;
  }

  saveToLocalStorage() {
    const data = JSON.stringify(this);
    localStorage.setItem('data', data);
  }

  getActiveProjectIndex() {
    return this.activeProjectIndex;
  }

  setActiveProjectIndex(index) {
    this.activeProjectIndex = index;
    this.saveToLocalStorage();
  }

  getActiveProject() {
    return this.projects[this.activeProjectIndex];
  }

  getAllProjects() {
    return this.projects;
  }

  addNewProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this.saveToLocalStorage();
  }

  removeProjectAt(index) {
    if (this.projects.length === 1) {
      return;
    }
    this.projects.splice(index, 1);
    this.activeProjectIndex = 0;
    this.saveToLocalStorage();
  }

  addTodo(title, description, dueDate, priority) {
    const activeProject = this.getActiveProject();
    activeProject.addTodo(title, description, dueDate, priority);
    this.saveToLocalStorage();
  }

  removeTodoAt(index) {
    const activeProject = this.getActiveProject();
    activeProject.removeTodoAt(index);
    this.saveToLocalStorage();
  }

  updateTodo(todo, index) {
    const activeProject = this.getActiveProject();
    activeProject.updateTodo(todo, index);
    this.saveToLocalStorage();
  }
}

export default App;
