export class Stack<T> {
  private container: T[] = [];

  push = (item:T, setData:React.Dispatch<React.SetStateAction<T[]>> ) => {
    this.container.push(item);
    setData([...this.container]);
  };
  pop = (setData:React.Dispatch<React.SetStateAction<T[]>>) => {
    this.container.pop();
    setData([...this.container]);
    
  };
  peak = ():number => {
    return this.container.length;
  };
  clear = (setData:React.Dispatch<React.SetStateAction<T[]>>) => {
    this.container = [];
    setData([])
  }
} 