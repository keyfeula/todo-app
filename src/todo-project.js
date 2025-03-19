export class TodoProject {
    constructor(name = "Untitled") {
        this.name = name;
        this.todoItems = [];
    }

    get length() {
        return this.todoItems.length;
    }

    addItem(todoItem) {
        this.todoItems.push(todoItem);
    }

    getTodoAt(index) {
        return this.todoItems[index];
    }

}