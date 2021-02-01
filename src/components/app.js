import Project from './project';

class App {
  constructor() {
    // dummy data
    const p1 = new Project('Project 1');
    p1.addTodo('Todo 1');
    p1.addTodo('Todo 2');
    p1.addTodo('Todo 3');

    const p2 = new Project('Project 2');
    p2.addTodo('Todo 4');
    p2.addTodo('Todo 5');

    const p3 = new Project('Project 3');
    p3.addTodo('Todo 6');

    this.projects = [p1, p2, p3];
    this.activeProjectIndex = 0;
  }

  getActiveProjectIndex() {
    return this.activeProjectIndex;
  }

  setActiveProjectIndex(index) {
    this.activeProjectIndex = index;
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
  }
}

export default App;
