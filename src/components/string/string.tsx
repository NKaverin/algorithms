import React, { createRef } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

interface strData {
  elem: string,
  color: ElementStates,
}

export const StringComponent: React.FC = () => {
  function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const inputRef = createRef<HTMLInputElement>();
  const initial:Array<strData> = [];
  const [str, setStr] = React.useState(initial);
  const turnString = async () => {
    if (inputRef.current) {
      let newArr:Array<strData> = [];
      for (let i = 0; i < inputRef.current.value.length; i++) {
        newArr.push({elem:inputRef.current.value[i], color:ElementStates.Default});
      }
      setStr(newArr);
      let buf = '';
      for (let i = 0; i < Math.floor(newArr.length/2); i++) { 
        newArr[i].color = ElementStates.Changing;
        newArr[newArr.length - 1 - i].color = ElementStates.Changing; 
        await sleep(1000).then(() => { setStr(str);});
        await sleep(1).then(() => { setStr(newArr); });  
        buf = newArr[i].elem;
        newArr[i].elem = newArr[newArr.length - 1 - i].elem;
        newArr[newArr.length - 1 - i].elem = buf;
        newArr[i].color = ElementStates.Default;
        newArr[newArr.length - 1 - i].color = ElementStates.Default; 

      } 
      await sleep(1000).then(() => { setStr(str);});
      await sleep(1).then(() => { setStr(newArr); }); 
    }
    
  }


  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
      <Input 
          maxLength={15}
          type='text'
          isLimitText={true}
          ref={inputRef} />
        <Button text="Развернуть" onClick={turnString} />
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
