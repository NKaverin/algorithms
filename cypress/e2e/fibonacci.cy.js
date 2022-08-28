import {host} from "./availableApp";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('Проверка Фибоначчи', () => {
    before('маршрут доступен', () => {
        cy.visit(`${host}/fibonacci`);
    });
    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear();
        cy.contains('Рассчитать').should('be.disabled');
    });

    it('числа генерируются корректно', () => {
        cy.get('input').type('5');
        cy.contains('Рассчитать').as('button');
        cy.get('@button').click();

        cy.get('[class*=circle_circle]').as('circle');
        
        // 1 
        cy.get('@circle').should('have.length', 1).each((element, index) => {
            if (index === 0) expect(element).to.contain('1')
        })

        cy.wait(DELAY_IN_MS);

        // 2
        cy.get('@circle').should('have.length', 2).each((element, index) => {
            if (index === 0) expect(element).to.contain('1');
            if (index === 1) expect(element).to.contain('1');
        });

        cy.wait(DELAY_IN_MS);

        // 3
        cy.get('@circle').should('have.length', 3).each((element, index) => {
            if (index === 0) expect(element).to.contain('1');
            if (index === 1) expect(element).to.contain('1');
            if (index === 2) expect(element).to.contain('2');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circle').should('have.length', 4).each((element, index) => {
            if (index === 0) expect(element).to.contain('1');
            if (index === 1) expect(element).to.contain('1');
            if (index === 2) expect(element).to.contain('2');
            if (index === 3) expect(element).to.contain('3');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circle').should('have.length', 5).each((element, index) => {
            if (index === 0) expect(element).to.contain('1');
            if (index === 1) expect(element).to.contain('1');
            if (index === 2) expect(element).to.contain('2');
            if (index === 3) expect(element).to.contain('3');
            if (index === 4) expect(element).to.contain('5');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_circle]').should('have.length', 6).each((element, index) => {
            if (index === 0) expect(element).to.contain('1');
            if (index === 1) expect(element).to.contain('1');
            if (index === 2) expect(element).to.contain('2');
            if (index === 3) expect(element).to.contain('3');
            if (index === 4) expect(element).to.contain('5');
            if (index === 5) expect(element).to.contain('8');
        });
        
        cy.wait(DELAY_IN_MS);
    })
});