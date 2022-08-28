import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states"
import { bubbleSort, selectSort } from "./sorting-page"

const data = [
    {elem: 1, color: ElementStates.Default},
    {elem: 4, color: ElementStates.Default},
    {elem: 3, color: ElementStates.Default},
    {elem: 5, color: ElementStates.Default},
    {elem: 2, color: ElementStates.Default}
]

const resultAscending = [
    {elem: 1, color: ElementStates.Modified},
    {elem: 2, color: ElementStates.Modified},
    {elem: 3, color: ElementStates.Modified},
    {elem: 4, color: ElementStates.Modified},
    {elem: 5, color: ElementStates.Modified}
]

const resultDescending = [
    {elem: 5, color: ElementStates.Modified},
    {elem: 4, color: ElementStates.Modified},
    {elem: 3, color: ElementStates.Modified},
    {elem: 2, color: ElementStates.Modified},
    {elem: 1, color: ElementStates.Modified}
];


describe('Сортировка выбором', () => {

    it("пустой массив", async () => {
        const result = await selectSort(Direction.Ascending, (a) => { return a}, [], ()=>{})
        expect(result).toEqual([]);
    });

    it("из одного элемента", async () => {
        const result = await selectSort(Direction.Ascending, (a) => { return a}, [{elem: 1, color: ElementStates.Default}], ()=>{})
        expect(result).toEqual([{elem: 1, color: ElementStates.Modified}]);
    });

    it('по возрастанию', async () => {
        const result = await selectSort(Direction.Ascending, (a) => { return a}, data, ()=>{})
        expect(result).toEqual(resultAscending);
    }, 10000);

    it('по убыванию', async () => {
        const result = await selectSort(Direction.Descending, (a) => { return a}, data, ()=>{})
        expect(result).toEqual(resultDescending);
    }, 10000);

})

describe('Сортировка пузырьком', () => {

    it("пустой массив", async () => {
        const result = await bubbleSort(Direction.Ascending,  (a) => { return a}, [], ()=>{})
        expect(result).toEqual([]);
    })

    it("из одного элемента", async () => {
        const result = await bubbleSort(Direction.Ascending,  (a) => { return a},  [{elem: 1, color: ElementStates.Default}], ()=>{})
        expect(result).toEqual([{elem: 1, color: ElementStates.Modified}]);
    })

    it('по возрастанию', async () => {
        const result = await bubbleSort(Direction.Ascending, (a) => { return a},  data, ()=>{})
        expect(result).toEqual(resultAscending);
    }, 10000)

    it('по убыванию', async () => {
        const result = await bubbleSort(Direction.Descending, (a) => { return a},  data, ()=>{})
        expect(result).toEqual(resultDescending);
    }, 10000)

}) 