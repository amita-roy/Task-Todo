import Project from '../components/project';
import Todo from '../components/todo';

const project = new Project('Test Project');
const todo = new Todo('Todo 1', 'Todo 1 desc', '2020-02-24', 'low');

test('Should return the project name', () => {
  expect(project.getName()).toBe('Test Project');
});

test('Should return length of the todos array', () => {
  expect(project.getTodos().length).toBe(0);
});

test('Should increase the length of the todos array', () => {
  project.addTodo(todo);
  expect(project.getTodos().length).toBe(1);
});

test('Should update the specified todo info', () => {
  const todo2 = new Todo('Todo 2', 'Todo 2 desc', '2020-02-25', 'high');
  project.updateTodo(todo2, 0);
  expect(project.getTodos()[0].title).toBe('Todo 2');
});

test('Should remove the indicated todo from the array', () => {
  project.removeTodoAt(0);
  expect(project.getTodos().length).toBe(0);
});
