import React, { createRef } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep } from "../utils/utils";
import styles from "./queue-page.module.css";

class Queue {
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

const queue = new Queue(7);

export const QueuePage: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [processing, setProcessing] = React.useState(false);
  const [blockButton, setBlockButton] = React.useState(true);
  const [loadingButton, setLoadingButton] = React.useState('');
  const enqueue = async () => {
    setLoadingButton('fibbonacci');
    if (inputRef.current) {
      // добавляем
      queue.enqueue(inputRef.current.value);
      // закрашиваем кружок
      setProcessing(true);
      inputRef.current.value = '';
      // блокируем кнопку
      setBlockButton(true);
      await sleep(500);
      setProcessing(false);
    }
    setLoadingButton('');
  }
  const dequeue = async () => {
    setLoadingButton('dequeue');
    // закрашиваем кружок
    setProcessing(true);
    // удаляем
    queue.dequeue();
    await sleep(500);
    setProcessing(false);
    setLoadingButton('');
  }
  const clear = async () => {
    setLoadingButton('clear');
    // удаляем
    setProcessing(true);
    queue.clear();
    await sleep(500);
    setProcessing(false);
    setLoadingButton('');
  } 
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.input}>
        <Input
          onChange={(e) => {setBlockButton(inputRef.current ? inputRef.current.value.length === 0 : true)} }
          maxLength={4}
          type='text'
          isLimitText={true}
          ref={inputRef} />
        <Button text="Добавить" onClick={enqueue} disabled={blockButton || queue.getLength() === queue.getTail()} isLoader ={loadingButton === 'enqueue'} />
        <Button text="Удалить" onClick={dequeue} disabled={queue.getTail() === queue.getHead()} isLoader ={loadingButton === 'dequeue'} />
        <Button text="Очистить" onClick={clear} isLoader ={loadingButton === 'clear'} />
      </div>            
      <div className={styles.output}>
        {queue.container.map((elem, index) => {
            return (
              <Circle 
                letter={elem} 
                key={index} 
                state={processing && index + 1 === queue.getLast() ? ElementStates.Changing : ElementStates.Default} 
                index={index} 
                head={queue.getHead() === index ? 'top' : ''}
                tail={queue.getTail() === index ? 'tail' : ''} />
            )
          })}       
      </div>
    </SolutionLayout>
  );
};
