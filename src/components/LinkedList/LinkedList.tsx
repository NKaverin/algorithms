
class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null = null;

    constructor(value: T, next: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
    }
}

export class LinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value: T) {
        const newNode = new LinkedListNode(value, null);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    append(value: T) {
        const newNode = new LinkedListNode(value, null);
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    deleteFromHead() {
        if (this.head) {
            if (this.head.next) {
            this.head = this.head.next;
            } else {
            this.head = null;
            }
        }
    }

    deleteFromTail() {
        if (this.head) {
            if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            } else {
            let nextNode = this.head.next;
            let prev = this.head;
            while (nextNode !== this.tail && nextNode) {
                prev = nextNode;
                nextNode = nextNode.next;
            }
            prev.next = null;
            this.tail = prev;
            }
        }
    }

    deleteIndex(index: number) {
        if (this.head) {
            if (index === 0) {
            this.deleteFromHead();
            } else {
            let nextNode = this.head.next;
            let prev = this.head;
            let i = index;
            while ((nextNode !== this.tail && nextNode) && (i !== 1 && nextNode)) {
                i--;
                prev = nextNode;
                nextNode = nextNode.next;
            }
            if (nextNode) {
                prev.next = nextNode.next;
            } else {
                prev.next = null;
            }
            this.tail = prev;
            }
        }
    }

    addIndex(value: T, index: number) {
        if (this.head) {
            if (index === 0) {
            this.prepend(value);
            } else {
            let nextNode = this.head.next;
            let prev = this.head;
            let i = index;
            while ((nextNode !== this.tail && nextNode) && (i !== 1 && nextNode)) {
                i--;
                prev = nextNode;
                nextNode = nextNode.next;
            }
            const newNode = new LinkedListNode(value, null);
            prev.next = newNode;
            newNode.next = nextNode;
            if (!nextNode) {
                this.tail = newNode;
            }
            }
        }
    }

    listToData() {
        const data:Array<T> = []
        let node = this.head;
        
        while (node) {
            data.push(node.value);
            node = node.next;
        }
        return data;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

} 