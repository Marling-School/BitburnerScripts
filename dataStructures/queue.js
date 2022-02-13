class Queue {
    constructor() {
        this.contents = [];
    }

    push(item) {
        this.contents.push(item);
    }

    pop() {
        return this.contents.pop();
    }

    peek() {
        if (this.contents.length === 0) return undefined;

        return this.contents[this.contents.length - 1]
    }
}

export default Queue;