import { ElementStates } from "../../types/element-states";
import { turnString } from "./string";

const resultOdd = [
    {elem: '1', color: ElementStates.Modified},
    {elem: '2', color: ElementStates.Modified},
    {elem: '3', color: ElementStates.Modified},
    {elem: '4', color: ElementStates.Modified},
    {elem: '5', color: ElementStates.Modified},
    {elem: '6', color: ElementStates.Modified}
];

const resultEven = [
    {elem: '1', color: ElementStates.Modified},
    {elem: '2', color: ElementStates.Modified},
    {elem: '3', color: ElementStates.Modified},
    {elem: '4', color: ElementStates.Modified},
    {elem: '5', color: ElementStates.Modified}
]

describe('Корректно разворачивает строку:', () => {

    it("с чётным количеством символов", async () => {
        const result = await turnString('654321', ()=>{}, ()=>{});
        expect(result).toEqual(resultOdd);
    });

    it("с нечетным количеством символов", async () => {
        const result = await turnString('54321', ()=>{}, ()=>{});
        expect(result).toEqual(resultEven);
    });

    it("с одним символом", async () => {
        const result = await turnString('1', ()=>{}, ()=>{});
        expect(result).toEqual([{elem: '1', color: ElementStates.Modified}]);
    });

    it("пустую строку", async () => {
        const result = await turnString('', ()=>{}, ()=>{});
        expect(result).toEqual([]);
    });

}) 