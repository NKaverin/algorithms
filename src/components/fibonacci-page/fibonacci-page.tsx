import React, { createRef } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sleep } from "../utils/utils";
import styles from "./fibonacci-page.module.css";

interface iData {
  elem: number,
  color: ElementStates,
}

export const FibonacciPage: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const initial:Array<iData> = [];
  const [data, setData] = React.useState(initial);
  const [blockButton, setBlockButton] = React.useState(true);
  const [loadingButton, setLoadingButton] = React.useState('');
  const fibbonacci = async () => {
    setLoadingButton('fibbonacci');
    if (inputRef.current) {
      let ndata:Array<iData> = initial;
      setData(ndata);
      const n = +inputRef.current.value
      for (let i = 1; i <= n + 1 && n < 20; i++) {
        // если первые два просто выводим 1
        if (i <= 2) {
          ndata.push({elem:1, color:ElementStates.Default})
        } else {
          ndata.push({elem:ndata[i-3].elem + ndata[i-2].elem, color:ElementStates.Default})
        }
        await sleep(DELAY_IN_MS);
        setData([...ndata]);
      }
    }
    setLoadingButton('');
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input}>
        <Input 
          onChange={(e) => {setBlockButton(inputRef.current ? inputRef.current.value.length === 0 || +inputRef.current.value > 19 : true)} }
          max={19}
          type='number'
          isLimitText={true}
          ref={inputRef} />
        <Button text="Рассчитать" onClick={fibbonacci} isLoader ={loadingButton === 'fibbonacci'} disabled={blockButton}/>
      </div>            
      <div className={styles.output}>
        {data.map((elem, index) => {
            return (
              <Circle letter={elem.elem} key={index} state={elem.color} index={index} />
            )
          })}       
      </div>
    </SolutionLayout>
  );
};
