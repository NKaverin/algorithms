import React, { createRef, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep } from "../utils/utils";
import styles from "./list-page.module.css";
import { v4 } from 'uuid'
import { LinkedList } from "../LinkedList/LinkedList";
import { DELAY_IN_MS } from "../../constants/delays";



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

      await sleep(DELAY_IN_MS);
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

      await sleep(DELAY_IN_MS);
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
    await sleep(DELAY_IN_MS);
    setData([...newData])
    // удаляем
    linkedList.deleteFromHead();
    // обнуляем, переполучаем
    newData = [];
    listData = linkedList.listToData();
    for (let i = 0; i < listData.length; i++) {
      newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
    }

    await sleep(DELAY_IN_MS);
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
    await sleep(DELAY_IN_MS);
    setData([...newData])
    // добавляем в лист
    linkedList.deleteFromTail();
    // обнуляем, переполучаем
    newData = [];
    listData = linkedList.listToData();
    for (let i = 0; i < listData.length; i++) {
      newData.push({elem: listData[i], color:ElementStates.Default, isHead: i === 0, isTail: i === listData.length - 1});
    }

    await sleep(DELAY_IN_MS);
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
        await sleep(DELAY_IN_MS)
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

      await sleep(DELAY_IN_MS);
      setData([...newData])
    }
    setLoadingButton('');
  }
  const deleteIndex = async () => {
    setLoadingButton('deleteIndex');
    if (inputRef.current && inputRefIndex.current) {
      const index = +inputRefIndex.current.value;
      let listData = linkedList.listToData();
      if (listData.length > index) {
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
            await sleep(DELAY_IN_MS)
            setData([...newData])
            newData[i] = ({elem: '', color:ElementStates.Changing, isHead: i === 0, isTail: i === listData.length - 1, deleteHere: listData[i]});
          }
          await sleep(DELAY_IN_MS)
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

        await sleep(DELAY_IN_MS);
        setData([...newData])
      }
    }
    setLoadingButton('');
  }
  useEffect(() => {
    data.push({elem: '1', color:ElementStates.Default, isHead: true, isTail: true});
    setData([...data])
  },[])

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
            return (<div key={v4() } className={styles.circles} >
              {index !== 0 &&  (<ArrowIcon key={v4()} fill={elem.color === ElementStates.Changing ? "#d252e1" : "#0032FF"} />)}
                {elem.addHere && (
                  <Circle
                    isSmall={true}
                    state={ElementStates.Changing}
                    letter={elem.addHere}
                    extraClass={styles.topCircle}
                    key={v4()}
                />)}
                <Circle 
                  letter={elem.elem} 
                  key={v4()} 
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
                    key={v4()}
                  />

                )}
                
            </div>)
          })}       
      </div>
    </SolutionLayout>
  );
};
