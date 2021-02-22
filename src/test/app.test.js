import App from '../components/app';
import Todo from '../components/todo';

const app = new App();

test('should return 0 as an active project index', () => {
  expect(app.getActiveProjectIndex()).toBe(0);
});

test('should return 3 as an active project if we setActiveprojectIndex with 3', () => {
  app.setActiveProjectIndex(3);
  expect(app.getActiveProjectIndex()).toBe(3);
});

test('should return the length of the projects array', () => {
  expect(app.getAllProjects().length).toBe(1);
});

test('should increase the length of projects array', () => {
  app.addNewProject('Test');
  expect(app.getAllProjects().length).toBe(2);
});

test('should remove one project from projects array', () => {
  app.removeProjectAt(0);
  expect(app.getAllProjects().length).toBe(1);
});

test('should add a new todo in  active project todos array', () => {
  const active = app.getActiveProject();
  active.addTodo('title1', 'description3', '2020-02-24', 'medium');
  expect(active.getTodos().length).toBe(1);
});

test('should return the length of active project todos array', () => {
  const active = app.getActiveProject();
  active.addTodo('title', 'description', '2020-02-24', 'medium');
  expect(active.getTodos().length).toBe(2);
});

test('should update the todo of activeProject at given index', () => {
  const todo = new Todo('Test1', 'descriptionnnnn', '2020-02-24', 'high');
  const active = app.getActiveProject();
  active.updateTodo(todo, 0);
  expect(active.getTodos()[0].title).toBe('Test1');
});

test('should return the length of active project todos array', () => {
  const active = app.getActiveProject();
  expect(active.getTodos().length).toBe(2);
});
test('should remove the todo at given index from activeProject', () => {
  const active = app.getActiveProject();
  active.removeTodoAt(0);
  expect(active.getTodos().length).toBe(1);
});
