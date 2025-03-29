import { TodoItem } from "./todo-item";

export class TodoProject {
    constructor(name = "Untitled") {
        this.name = name;
        this.todoItems = [];
    }

    getName() {
        return this.name;
    }

    get length() {
        return this.todoItems.length;
    }

    addItem(title, description, dueDate, priority) {
        const newTodoItem = new TodoItem(title, description, dueDate, priority);
        this.todoItems.push(newTodoItem);
    }

    getTodoAt(index) {
        return this.todoItems[index];
    }

    removeTodoAt(index) {
        this.todoItems.splice(index, 1);
    }

}