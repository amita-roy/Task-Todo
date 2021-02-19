import Todo from '../components/todo';

const todo = new Todo("Todo 1", "Todo 1 desc", "2020-02-24", "low")

test('Should return the todo info', () => {
    expect(todo.getInfo()).toEqual({ "description": "Todo 1 desc", "dueDate": "2020-02-24", "priority": "low", "title": "Todo 1" });
});