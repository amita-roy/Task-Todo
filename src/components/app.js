import Project from './project';

class App {
  constructor() {
    this.projects = [];
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
