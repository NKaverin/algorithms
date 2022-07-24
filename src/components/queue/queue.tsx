export class Queue {
  container: string[] = [];
  private head: number = 0;
  private tail: number = 0;
  private last: number = 0;
  private size: number = 0;

  constructor(size: number) {
    this.size = size;
    for (let i = 0; i < size; i++) {
      this.container.push('');
    }
  }

  enqueue = (item: string) => {
    this.container[this.tail] = item;
    this.tail++;
    this.last = this.tail;
  };

  dequeue = () => {
    this.container[this.head] = '';
    this.head++;
    this.last = this.head;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;

    for (let i = 0; i < this.size; i++) {
      this.container[i] = '';
    }
    console.log(this.container)
  };

  getHead = () => {
    return this.head;
  }

  getTail = () => {
    return this.tail;
  }

  getLast= () => {
    return this.last;
  }
  getLength= () => {
    return this.container.length;
  }
} 