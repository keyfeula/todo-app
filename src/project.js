import { Todo } from "./todo";

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    addTodo(name, dueDate, priority, description) {
        const newTodo = new Todo(name, dueDate, priority, description);
        this.todos.push(newTodo);
    }

    getTodoAt(index) {
        return this.todos[index];
    }

    removeTodoAt(index) {
        this.todos.splice(index, 1);
    }

    getTodosLength() {
        return this.todos.length;
    }

}