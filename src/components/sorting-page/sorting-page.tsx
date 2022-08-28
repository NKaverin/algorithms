import React, { useEffect } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep } from "../utils/utils";
import styles from "./sorting-page.module.css";

interface iData {
  elem: number,
  color: ElementStates,
}

// сортировка пузырьком
export async function bubbleSort(order: Direction, setLoadingButton:(a:string) => void, data:iData[], setData:(data:iData[]) => void ) {
  if (order === Direction.Ascending) {
    setLoadingButton('Ascending');
  } else {
    setLoadingButton('Descending');
  }
  let ndata:Array<iData> = data;
  let buf = 1;
  // подсвечиваем все элементы по дефолту
  for (let i = 0; i < data.length; i++) {
    ndata[i].color = ElementStates.Default;
  }
  setData([...ndata]);
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      // подсвечиваем как изменяемые
      ndata[i].color = ElementStates.Changing;
      ndata[j].color = ElementStates.Changing;
      await sleep(SHORT_DELAY_IN_MS).then(() => { setData([...ndata]); }); 
      // сравниваем и меняем
      if (order === Direction.Ascending) {
        if (ndata[i].elem > ndata[j].elem) {
          buf = ndata[i].elem;
          ndata[i].elem = ndata[j].elem;
          ndata[j].elem = buf;
        }
      } else {
        if (ndata[i].elem < ndata[j].elem) {
          buf = ndata[i].elem;
          ndata[i].elem = ndata[j].elem;
          ndata[j].elem = buf;
        }
      }
      await sleep(SHORT_DELAY_IN_MS);
      // снимаем подсветку
      ndata[i].color = ElementStates.Default;
      ndata[j].color = ElementStates.Default;

    }
    // модифицируем следующий
    ndata[i].color = ElementStates.Modified;
    setData([...ndata]);
  }
  setLoadingButton('');
  return ndata;
}

export async function selectSort(order: Direction, setLoadingButton:(a:string) => void, data:iData[], setData:(data:iData[]) => void ) {
  if (order === Direction.Ascending) {
    setLoadingButton('Ascending');
  } else {
    setLoadingButton('Descending');
  }
  let ndata:Array<iData> = data;
  let buf = 1;
  // подсвечиваем все элементы по дефолту
  for (let i = 0; i < data.length; i++) {
    ndata[i].color = ElementStates.Default;
  }
  setData([...ndata]);
  let current = 0;
  for (let i = 0; i < data.length; i++) {
    current = i;

    await sleep(SHORT_DELAY_IN_MS).then(() => { setData([...ndata]); });
    for (let j = i + 1; j < data.length; j++) {
      // подсвечиваем как изменяемые
      ndata[current].color = ElementStates.Changing;
      ndata[j].color = ElementStates.Changing;
      await sleep(SHORT_DELAY_IN_MS).then(() => { setData([...ndata]); }); 
      // сравниваем и подсвечиваем по новому
      if (order === Direction.Ascending) {
        if (ndata[current].elem > ndata[j].elem) {
          ndata[current].color = ElementStates.Default;
          current = j;
          ndata[current].color = ElementStates.Changing;
        }
      } else {
        if (ndata[current].elem < ndata[j].elem) {
          ndata[current].color = ElementStates.Default;
          current = j;
          ndata[current].color = ElementStates.Changing;
        }
      }
      await sleep(SHORT_DELAY_IN_MS);
      // меняем цвет на дефолтный
      ndata[current].color = ElementStates.Default
      ndata[j].color = ElementStates.Default;
    }
    // меняем элементы местами
    buf = ndata[i].elem;
    ndata[i].elem = ndata[current].elem;
    ndata[current].elem = buf;
    // подсвечиваем модифицированным след. по порядку
    ndata[i].color = ElementStates.Modified;
    await sleep(SHORT_DELAY_IN_MS);
    setData([...ndata]);
  }
  setLoadingButton('');
  return ndata;
}

export const SortingPage: React.FC = () => {
  const initial:Array<iData> = [];
  const [data, setData] = React.useState(initial);
  const [sortOrder, setSortOrder] = React.useState(Direction.Descending);
  const [sortType, setSortType] = React.useState('selection'); //+bubble
  const [loadingButton, setLoadingButton] = React.useState('');

  // создание случайного массива
  function  randomArr () {
    const getRandom = (min:number, max:number) => {
      return Math.floor(Math.random() * (max - min) + min);
    }
    let ndata:Array<iData> = initial;
    const length = getRandom(3, 17);
    for (let i = 0; i < length; i++) {
      ndata.push({elem:getRandom(0, 100), color:ElementStates.Default}); 
    }
    setData([...ndata]);
  }
  
  const onClickSort = (order:Direction) => {
    setSortOrder(order)
    sortType === 'bubble' ? bubbleSort(order, setLoadingButton, data, setData) : selectSort(order, setLoadingButton, data, setData);
  }

  useEffect(() => {
    randomArr();
  },[])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.input}>
        <RadioInput
          label="Выбор"
          checked={sortType === 'selection'}
          onChange={() => setSortType('selection')}
        />
        <RadioInput
          label="Пузырёк"
          checked={sortType === 'bubble'}
          onChange={() => setSortType('bubble')}
        />
        <Button 
          text="По возрастанию" 
          isLoader ={loadingButton === 'Ascending'} 
          sorting={sortOrder}  
          onClick={() => onClickSort(Direction.Ascending)}/>
        <Button 
          text="По убыванию" 
          isLoader ={loadingButton === 'Descending'} 
          sorting={sortOrder} 
          onClick={() => onClickSort(Direction.Descending)}
        />
        <Button text="Новый массив" isLoader ={loadingButton === 'turnString'} onClick={randomArr}/>
      </div>            
      <div className={styles.output}>
        {data.map((elem, index) => {
            return (
              <Column index={elem.elem} key={index} state={elem.color} />
            )
          })}       
      </div>
    </SolutionLayout>
  );
};
