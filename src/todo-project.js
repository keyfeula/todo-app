export class TodoProject {
    constructor(name = "Untitled") {
        this.name = name;
        this.todoItems = [];
    }

    addItem(todoItem) {
        this.todoItems.push(todoItem);
    }
}