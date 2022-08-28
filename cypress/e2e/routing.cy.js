import {host} from "./availableApp";

describe('Роутинг', () => {

    before('маршрут доступен', () => {
        cy.visit(host);
    });

    it('страница строка', () => { 
        cy.get('a[href*="/recursion"]').click();
        cy.contains('Строка');
        cy.contains('К оглавлению').click();
    });

    it('страница Фибоначчи', () => {
        cy.get('a[href*="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
        cy.contains('К оглавлению').click();
    });

    it('страница сортровка', () => {
        cy.get('a[href*="/sorting"]').click();
        cy.contains('Сортировка массива')
        cy.contains('К оглавлению').click();
    });

    it('страница стэк', () => {
        cy.get('a[href*="/stack"]').click();
        cy.contains('Стек')
        cy.contains('К оглавлению').click();
    });

    it('страница очередь', () => {
        cy.get('a[href*="/queue"]').click();
        cy.contains('Очередь')
        cy.contains('К оглавлению').click();
    });

    it('страница лист', () => {
        cy.get('a[href*="/list"]').click();
        cy.contains('Связный список');
    });

});