import Todo from './todo';

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    static fromJSON(json) {
        const project = new Project(json.name);
        project.todos = json.todos.map(
            (todo) => new Todo(todo.title, todo.description, todo.dueDate, todo.priority),
        );
        return project;
    }

    getName() {
        return this.name;
    }

    getTodos() {
        return this.todos;
    }

    addTodo(title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority));
    }

    removeTodoAt(index) {
        this.todos.splice(index, 1);
    }

    updateTodo(todo, index) {
        this.todos[index] = todo;
    }
}

export default Project;
