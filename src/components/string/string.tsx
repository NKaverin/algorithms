import React, { createRef } from "react";
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

export const StringComponent: React.FC = () => {

  const inputRef = createRef<HTMLInputElement>();
  const initial:Array<strData> = [];
  const [str, setStr] = React.useState(initial);
  const [loadingButton, setLoadingButton] = React.useState('');
  const turnString = async () => {
    if (inputRef.current) {
      setLoadingButton('turnString');
      let newArr:Array<strData> = [];
      // заполняем массив
      for (let i = 0; i < inputRef.current.value.length; i++) {
        newArr.push({elem:inputRef.current.value[i], color:ElementStates.Default});
      }
      setStr(newArr);
      let buf = '';
      for (let i = 0; i < Math.round(newArr.length/2); i++) { 
        // подсвечиваем как изменяемые
        newArr[i].color = ElementStates.Changing;
        newArr[newArr.length - 1 - i].color = ElementStates.Changing; 
        await sleep(500).then(() => { setStr([...newArr]); }); 
        // меняем местами
        buf = newArr[i].elem;
        newArr[i].elem = newArr[newArr.length - 1 - i].elem;
        newArr[newArr.length - 1 - i].elem = buf;
        // подсвечиваем как модифицированные
        newArr[i].color = ElementStates.Modified;
        newArr[newArr.length - 1 - i].color = ElementStates.Modified; 
      } 
      await sleep(500).then(() => { setStr([...newArr]);});
      setLoadingButton('');
    }
  }


  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input 
          maxLength={11}
          type='text'
          isLimitText={true}
          ref={inputRef} 
        />
        <Button text="Развернуть" onClick={turnString} isLoader ={loadingButton === 'turnString'} />
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
