import {host} from "./availableApp";
import {DELAY_IN_MS} from "../../src/constants/delays";

const addElement = (element) => {
    cy.get('input').type(element);
    cy.contains('Добавить').click();
    cy.get('[class*=circle_changing]').contains(element);
    cy.wait(DELAY_IN_MS);
    cy.get('[class*=circle_default]').contains(element);
}

const deleteElement = (element) => {
    cy.contains('Удалить').click();
    cy.get('[class*=circle_changing]').contains(element);
    cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === length - 1) expect(el).to.contain(element)
    });    
}

describe('Проверка стэка', () => {

    before('маршрут доступен', () => {
        cy.visit(`${host}/stack`);
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear();
        cy.contains('Добавить').should('be.disabled');
    });
    
    it('добавление элемента в стек', () => {
        addElement('1');
        // инпут очищается
        cy.get('input').should('have.value', '');

        cy.get('[class*=circle_content]').as('circle');

        cy.wait(DELAY_IN_MS);
        cy.get('@circle').should('have.length', 1).each((element, index) => {
            expect(element).to.contain('1');
        });

        addElement('2');

        cy.get('@circle').should('have.length', 2).each((element, index) => {
            if (index === 1) expect(element).to.contain('2');
            if (index === 0) expect(element).to.contain('1');
        });
        
        addElement('3');
        cy.get('@circle').should('have.length', 3).each((element, index) => {
            if (index === 2) expect(element).to.contain('3');
            if (index === 1) expect(element).to.contain('2');
            if (index === 0) expect(element).to.contain('1');
        });
    });

    it('удаление элемента из стека', () => {
        cy.get('[class*=circle_content]').as('circle');
        deleteElement('3');
        cy.get('@circle').should('have.length', 2).each((element, index) => {
            if (index === 1) expect(element).to.contain('2');
            if (index === 0) expect(element).to.contain('1');     
        });
        deleteElement('2');
        cy.get('@circle').should('have.length', 1).each((element, index) => {
            expect(element).to.contain('1');
        });
        deleteElement('1');
        cy.get('@circle').should('have.length', 0);
    });

    it('поведение кнопки «Очистить»', () => {
        addElement('1');
        addElement('2');
        addElement('3');
        cy.contains('Очистить').click();
        cy.get('[class*=circle_content]').should('have.length', 0);
    });

})