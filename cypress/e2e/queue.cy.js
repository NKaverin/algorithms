import {host} from "./availableApp";
import {DELAY_IN_MS} from "../../src/constants/delays";

const addElement = (element) => {
    cy.get('input').type(element);
    cy.contains('Добавить').click();
    cy.get('[class*=circle_changing]').contains(element);
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_default]').contains(element);
}

const deleteElement = () => {
    cy.contains('Удалить').click();
}

describe('Очередь работает корректно', () => {

    before('маршрут доступен', () => {
        cy.visit(`${host}/queue`);
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear();
        cy.contains('Добавить').should('be.disabled');
    });

    it('добавление элемента в очередь', () => {
        addElement('1');
        cy.get('[class*=circle_content]').as('circle');
        cy.get('@circle').each((element, index) => {
            if (index === 0) expect(element).to.contain('1');
            if (index === 0) expect(element).to.contain('top');
            if (index === 1) expect(element).to.contain('tail');
        })
        addElement('2');
        cy.get('@circle').each((element, index) => {
            if (index === 1) expect(element).to.contain('2');
            if (index === 0) expect(element).to.contain('top');
            if (index === 2) expect(element).to.contain('tail');
        });
    });

    it('удаление элемента из очереди', () => {
        cy.get('[class*=circle_content]').as('circle');
        deleteElement('1');
        cy.get('@circle').each((element, index) => {
            if (index === 0) expect(element).to.contain('');
            if (index === 1) expect(element).to.contain('2');
            if (index === 2) expect(element).to.contain('tail');
        });
        cy.wait(DELAY_IN_MS);
        cy.get('@circle').each((element, index) => {
            if (index === 1) expect(element).to.contain('top');
        });
    });

    it('удаление элемента из очереди', () => {
        addElement('1');
        addElement('2');
        cy.contains('Очистить').click();
        cy.get('[class*=circle_content]').each((element, index) => {
            if (index === 0) expect(element).to.contain('');
            if (index === 1) expect(element).to.contain('');
            if (index === 2) expect(element).to.contain('');
            if (index === 3) expect(element).to.contain('');
            if (index === 4) expect(element).to.contain('');
            if (index === 5) expect(element).to.contain('');
            if (index === 6) expect(element).to.contain('');
        });
    });
})