import React, { createRef } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep } from "../utils/utils";
import styles from "./string.module.css";

interface strData {
  elem: string,
  color: ElementStates,
}

export const turnString = async (inputRef: string, setLoadingButton:(a:string) => void, setStr:(a:Array<strData>) => void) => {
  setLoadingButton('turnString');
  let newArr:Array<strData> = [];
  // заполняем массив
  for (let i = 0; i < inputRef.length; i++) {
    newArr.push({elem:inputRef[i], color:ElementStates.Default});
  }
  setStr(newArr);
  let buf = '';
  for (let i = 0; i < Math.round(newArr.length/2); i++) { 
    // подсвечиваем как изменяемые
    newArr[i].color = ElementStates.Changing;
    newArr[newArr.length - 1 - i].color = ElementStates.Changing; 
    await sleep(DELAY_IN_MS).then(() => { setStr([...newArr]); }); 
    // меняем местами
    buf = newArr[i].elem;
    newArr[i].elem = newArr[newArr.length - 1 - i].elem;
    newArr[newArr.length - 1 - i].elem = buf;
    // подсвечиваем как модифицированные
    newArr[i].color = ElementStates.Modified;
    newArr[newArr.length - 1 - i].color = ElementStates.Modified; 
  } 
  await sleep(DELAY_IN_MS).then(() => { setStr([...newArr]);});
  setLoadingButton('');
  return newArr;
}

export const StringComponent: React.FC = () => {

  const inputRef = createRef<HTMLInputElement>();
  const [blockButton, setBlockButton] = React.useState(true);
  const initial:Array<strData> = [];
  const [str, setStr] = React.useState(initial);
  const [loadingButton, setLoadingButton] = React.useState('');


  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input 
          onChange={(e) => {setBlockButton(inputRef.current ? inputRef.current.value.length === 0 : true)} }
          maxLength={11}
          type='text'
          isLimitText={true}
          ref={inputRef} 
        />
        <Button text="Развернуть" onClick={() => turnString(inputRef.current ? inputRef.current.value : '', setLoadingButton, setStr)} isLoader ={loadingButton === 'turnString'} disabled={blockButton}/>
      </div>            
      <div className={styles.output}>
        {str.map((elem, index) => {
            return (
              <Circle letter={elem.elem} key={index} state={elem.color} />
            )
          })}       
      </div>
    </SolutionLayout>
  );
};
