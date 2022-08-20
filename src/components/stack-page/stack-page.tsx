import React, { createRef } from "react";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../stack/stack";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep } from "../utils/utils";
import styles from "./stack-page.module.css";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  
  const inputRef = createRef<HTMLInputElement>();
  const initial:Array<string> = [];
  const [data, setData] = React.useState(initial);
  const [loadingButton, setLoadingButton] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [blockButton, setBlockButton] = React.useState(true);
  const push = async () => {
    setLoadingButton('push');
    if (inputRef.current) {
      // добавляем
      stack.push(inputRef.current.value, setData);
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
  const pop = async () => {
    setLoadingButton('pop');
    if (inputRef.current) {
      // закрашиваем кружок
      setProcessing(true);
      await sleep(500);
      // удаляем
      stack.pop(setData);
      setProcessing(false);
    }
    setLoadingButton('');
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.input}>
        <Input
          onChange={(e) => {setBlockButton(inputRef.current ? inputRef.current.value.length === 0 : true)} }
          maxLength={4}
          type='text'
          isLimitText={true}
          ref={inputRef} />
        <Button text="Добавить" onClick={push} disabled={blockButton} isLoader ={loadingButton === 'push'} />
        <Button text="Удалить" onClick={pop} disabled={stack.peak() === 0} isLoader ={loadingButton === 'pop'} />
        <Button text="Очистить" onClick={() => {stack.clear(setData)}} disabled={stack.peak() === 0} isLoader ={loadingButton === 'clear'} />
      </div>            
      <div className={styles.output}>
        {data.map((elem, index) => {
            return (
              <Circle letter={elem} key={index} state={processing && index + 1 === stack.peak() ? ElementStates.Changing : ElementStates.Default} index={index} />
            )
          })}       
      </div>
    </SolutionLayout>
  );
};
