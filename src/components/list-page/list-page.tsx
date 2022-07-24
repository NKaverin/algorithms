import React, { createRef } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep } from "../utils/utils";
import styles from "./list-page.module.css";

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T, next: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

class LinkedList<T> {
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

const linkedList = new LinkedList<string>();

interface strData {
  elem: string,
  color: ElementStates,
  addHere?: string,
  addTail?: string,
  isHead?: boolean,
  isTail?: boolean
  deleteHere?: string,
}

export const ListPage: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const inputRefIndex = createRef<HTMLInputElement>();
  const initial:Array<strData> = [];
  const [blockButton, setBlockButton] = React.useState(true);
  const [blockButtonIndex, setBlockButtonIndex] = React.useState(true);
  const [data, setData] = React.useState(initial);
  const [loadingButton, setLoadingButton] = React.useState('');

  const prepend = async () => {
    setLoadingButton('prepend');
    if (inputRef.current) {
      const value = inputRef.current.value;
      let listData = linkedList.listToData();
      let newData = initial;
      for (let i = 0; i < listData.length; i++) {
        if (i === 0) {
          // подсвечиваем первый элемент
          newData.push({elem: listData[i], color:ElementStates.Changing, addHere:value, isHead: i === 0, isTail: i === listData.length - 1});
        } else {
          newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
        }
      }
      // показываем
      setData([...newData])
      // добавляем в лист
      linkedList.prepend(inputRef.current.value);
      // обнуляем, переполучаем
      newData = [];
      listData = linkedList.listToData();
      for (let i = 0; i < listData.length; i++) {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }

      await sleep(500);
      setData([...newData])
    }
    setLoadingButton('');
  }
  const append = async () => {
    setLoadingButton('append');
    if (inputRef.current) {
      const value = inputRef.current.value;
      let listData = linkedList.listToData();
      let newData = initial;
      for (let i = 0; i < listData.length; i++) {
        if (i === listData.length - 1) {
          // подсвечиваем последний элемент
          newData.push({elem: listData[i], color:ElementStates.Changing, addHere:value, isHead: i === 0, isTail: i === listData.length - 1});
        } else {
          newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
        }
      }
      // показываем
      setData([...newData])
      // добавляем в лист
      linkedList.append(inputRef.current.value);
      // обнуляем, переполучаем
      newData = [];
      listData = linkedList.listToData();
      for (let i = 0; i < listData.length; i++) {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }

      await sleep(500);
      setData([...newData])
    }
    setLoadingButton('');
  }
  const deleteFromHead = async () => {
    setLoadingButton('deleteFromHead');
    let listData = linkedList.listToData();
    let newData = initial;
    for (let i = 0; i < listData.length; i++) {
      if (i === 0) {
        // подсвечиваем первый элемент
        newData.push({elem: listData[i], color:ElementStates.Changing, isHead: i === 0, isTail: i === listData.length - 1});
      } else {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }
    }
    // показываем
    setData([...newData])
    newData[0] = ({elem: '', color:ElementStates.Changing, deleteHere:listData[0], isHead: true, isTail: 0 === listData.length - 1});
    await sleep(500);
    setData([...newData])
    // удаляем
    linkedList.deleteFromHead();
    // обнуляем, переполучаем
    newData = [];
    listData = linkedList.listToData();
    for (let i = 0; i < listData.length; i++) {
      newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
    }

    await sleep(500);
    setData([...newData])
    setLoadingButton('');
  }
  const deleteFromTail = async () => {
    setLoadingButton('deleteFromTail');
    let listData = linkedList.listToData();
    let newData = initial;
    for (let i = 0; i < listData.length; i++) {
      if (i === listData.length - 1) {
        // подсвечиваем последний элемент
        newData.push({elem: listData[i], color:ElementStates.Changing, isHead: i === 0, isTail: i === listData.length - 1});

      } else {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }
    }
    // показываем
    setData([...newData])
    newData[listData.length - 1] = ({elem: '', color:ElementStates.Changing, deleteHere:listData[listData.length - 1], isHead: listData.length - 1 === 0, isTail: true});
    await sleep(500);
    setData([...newData])
    // добавляем в лист
    linkedList.deleteFromTail();
    // обнуляем, переполучаем
    newData = [];
    listData = linkedList.listToData();
    for (let i = 0; i < listData.length; i++) {
      newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
    }

    await sleep(500);
    setData([...newData])
    setLoadingButton('');
  }
  const addIndex = async () => {
    setLoadingButton('addIndex');
    if (inputRef.current && inputRefIndex.current) {
      const value = inputRef.current.value;
      const index = +inputRefIndex.current.value;
      let listData = linkedList.listToData();
      let newData = initial;
      for (let i = 0; i < listData.length; i++) {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }
      setData([...newData])
      for (let i = 0; i < listData.length && i <= index; i++) {
        // подсвечиваем элементы по очереди
        newData[i] = ({elem: listData[i], color:ElementStates.Changing, isHead: i === 0, isTail: i === listData.length - 1, addHere: value});
        if (i !== 0 ) {
          newData[i - 1] = ({elem: listData[i - 1], color:ElementStates.Changing, isHead: i - 1 === 0, isTail: i - 1 === listData.length - 1, addHere: ''});
        }
        await sleep(500)
        setData([...newData])
      }

      // добавляем в лист
      linkedList.addIndex(value, index);
      // обнуляем, переполучаем
      newData = [];
      listData = linkedList.listToData();
      for (let i = 0; i < listData.length; i++) {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }

      await sleep(500);
      setData([...newData])
    }
    setLoadingButton('');
  }
  const deleteIndex = async () => {
    setLoadingButton('deleteIndex');
    if (inputRef.current && inputRefIndex.current) {
      const index = +inputRefIndex.current.value;
      let listData = linkedList.listToData();
      let newData = initial;
      for (let i = 0; i < listData.length; i++) {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }
      setData([...newData])
      for (let i = 0; i < listData.length && i <= index; i++) {
        // подсвечиваем элементы по очереди
        newData[i] = ({elem: listData[i], color:ElementStates.Changing, isHead: i === 0, isTail: i === listData.length - 1});
        if (i !== 0 ) {
          newData[i - 1] = ({elem: listData[i - 1], color:ElementStates.Changing, isHead: i - 1 === 0, isTail: i - 1 === listData.length - 1, addHere: ''});
        }
        if (i === index) {
          await sleep(500)
          setData([...newData])
          newData[i] = ({elem: '', color:ElementStates.Changing, isHead: i === 0, isTail: i === listData.length - 1, deleteHere: listData[i]});
        }
        await sleep(500)
        setData([...newData])
      }

      // удаляем
      linkedList.deleteIndex(index);

      // обнуляем, переполучаем
      newData = [];
      listData = linkedList.listToData();
      for (let i = 0; i < listData.length; i++) {
        newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
      }

      await sleep(500);
      setData([...newData])
    }
    setLoadingButton('');
  }
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.input}>
        <Input
          onChange={(e) => {setBlockButton(inputRef.current ? inputRef.current.value.length === 0 : true)} }
          maxLength={4}
          type='text'
          isLimitText={true}
          ref={inputRef} 
          extraClass={styles.inputField}
        />
        <Button text="Добавить в head"
          isLoader ={loadingButton === 'prepend'}
          onClick={prepend}
          disabled={blockButton}
          extraClass={styles.onceInput}
        />
        <Button text="Добавить в tail"
          isLoader ={loadingButton === 'append'}
          onClick={append}
          disabled={blockButton}
          extraClass={styles.onceInput}
        />
        <Button text="Удалить из head"
          isLoader ={loadingButton === 'deleteFromHead'}
          onClick={deleteFromHead}
          disabled={blockButton}
          extraClass={styles.onceInput}
        />
        <Button text="Удалить из tail"
          isLoader ={loadingButton === 'deleteFromTail'}
          onClick={deleteFromTail}
          disabled={blockButton}
          extraClass={styles.onceInput}
        />
      </div>
      <div className={styles.input}>
        <Input
          onChange={(e) => {setBlockButtonIndex(inputRefIndex.current ? inputRefIndex.current.value.length === 0 : true)} }
          type='number'
          placeholder='Введите индекс'
          ref={inputRefIndex}
          extraClass={styles.inputField}
        />

        <Button text="Добавить по индексу"
          isLoader ={loadingButton === 'addIndex'}
          onClick={addIndex}
          disabled={blockButtonIndex}
          extraClass={styles.doubleInput}
        />
        <Button text="Удалить по индексу"
          isLoader ={loadingButton === 'deleteIndex'}
          onClick={deleteIndex}
          disabled={blockButtonIndex}
          extraClass={styles.doubleInput}
        />
      </div>           
      <div className={styles.output}>
        {data.map((elem, index) => {
            return (<>
            {index !== 0 &&  (<ArrowIcon fill={elem.color === ElementStates.Changing ? "#d252e1" : "#0032FF"} />)}
            <div key={index} className={styles.circles}>
              {elem.addHere && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={elem.addHere}
                  extraClass={styles.topCircle}
              />)}
              <Circle 
                letter={elem.elem} 
                key={index} 
                state={elem.color} 
                index={index} 
                extraClass={styles.centerCircle}
                head={elem.isHead === true && !elem.addHere ? 'top' : ''}
                tail={elem.isTail === true && !elem.deleteHere ? 'tail' : ''} />
              {elem.deleteHere && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={elem.deleteHere}
                  extraClass={styles.bottomCircle}
                />

              )}
              
              </div> 
            </>)
          })}       
      </div>
    </SolutionLayout>
  );
};
