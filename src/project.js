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

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodoAt(index) {
        return this.todos[index];
    }

    removeTodoAt(index) {
        this.todos.splice(index, 1);
    }

}