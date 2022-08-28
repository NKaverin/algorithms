import {host} from "./availableApp";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('Проверка строки', () => {

    before('маршрут доступен', () => {
        cy.visit(`${host}/recursion`);
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear();
        cy.contains('Развернуть').should('be.disabled');
    });

    it('строка разворачивается корректно', () => {
        cy.get('input').type('123');
        cy.contains('Развернуть').as('button');
        cy.get('@button').click();

        cy.get('[class*=circle_circle]').as('circle');
        
        // проверяем что подсвечены и все на месте
        cy.get('@circle').each((element, index) => {
            if (index === 0 || index === 2) cy.wrap(element).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
            if (index === 0) expect(element).to.contain('1');
            if (index === 2) expect(element).to.contain('3');
        });

        cy.wait(DELAY_IN_MS);

        //второй элемент подсвечен, а первый и третий модифицированы
        cy.get('@circle').each((element, index) => {
            if (index === 1) cy.wrap(element).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
            if (index === 0 || index === 2) cy.wrap(element).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        });
        
        cy.wait(DELAY_IN_MS)
        
        // строка развернута и все элементы модифицированы
        cy.get('@circle').each((element, index) => {
            if (index === 0) expect(element).to.contain('3');
            if (index === 1) expect(element).to.contain('2');
            if (index === 2) expect(element).to.contain('1');
            cy.wrap(element).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        })
    })
});