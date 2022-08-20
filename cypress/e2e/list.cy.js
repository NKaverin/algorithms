import {host} from "./availableApp";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Список работает корректно', () => {

    before('маршрут доступен', () => {
        cy.visit(`${host}/list`);
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').eq(0).clear();
        cy.contains('Добавить в head').should('be.disabled');
        cy.contains('Добавить в tail').should('be.disabled');
        cy.contains('Добавить по индексу').should('be.disabled');
    });

    it('отрисовка дефолтного списка', () => {
        cy.get('[class*=circle_content]').should('have.length', 1).each((element, index) => {
            cy.wrap(element).contains('top');
            cy.wrap(element).contains('tail');
        });
        cy.get('[class*=circle_letter]').each((element) => {
            cy.get(element).should('not.have.text', '');
        });
    });

    it('добавление элемента в head', () => {
        cy.get('input').eq(0).type('1');
        cy.contains('Добавить в head').click();
        cy.wait(DELAY_IN_MS);
        cy.get('input').eq(0).clear();
        cy.get('input').eq(0).type('0');
        cy.contains('Добавить в head').click();
        cy.wait(DELAY_IN_MS);
        cy.get('[class*=circle_content]').should('have.length', 2).each((element, index) => {
            if (index === 0) cy.wrap(element).contains('0');
            if (index === 1) cy.wrap(element).contains('1');
        });
    });

    it('добавление элемента в tail', () => {
        cy.get('input').eq(0).clear();
        cy.get('input').eq(0).type('3');
        cy.contains('Добавить в tail').click();
        cy.wait(DELAY_IN_MS);
        cy.get('[class*=circle_content]').should('have.length', 3).each((element, index) => {
            if (index === 0) cy.wrap(element).contains('0');
            if (index === 1) cy.wrap(element).contains('1');
            if (index === 2) cy.wrap(element).contains('3');
        });
    });

    it('добавления элемента по индексу', () => {
        cy.get('input').eq(0).clear();
        cy.get('input').eq(0).type('2');
        cy.get('input').eq(1).type(2);
        cy.contains('Добавить по индексу').click();
        cy.wait(DELAY_IN_MS);
        cy.wait(DELAY_IN_MS);
        cy.wait(DELAY_IN_MS);
        cy.get('[class*=circle_content]').each((element, index) => {
            if (index === 0) cy.wrap(element).contains('0');
            if (index === 1) cy.wrap(element).contains('1');
            if (index === 2) cy.wrap(element).contains('2');
            if (index === 3) cy.wrap(element).contains('3');
        });
    });

    it('удаление элемента из head', () => {
        cy.contains('Удалить из head').click();
        cy.wait(DELAY_IN_MS);
        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').each((element, index) => {
            if (index === 0) cy.wrap(element).contains('1');
            if (index === 1) cy.wrap(element).contains('2');
            if (index === 2) cy.wrap(element).contains('3');
        });
    });

    it('удаление элемента из tail', () => {
        cy.contains('Удалить из tail').click();
        cy.wait(DELAY_IN_MS);
        cy.get('[class*=circle_content]').each((element, index) => {
            if (index === 0) cy.wrap(element).contains('1');
            if (index === 1) cy.wrap(element).contains('2');
        });
    });

    it('удаление элемента по индексу', () => {
        cy.get('input').eq(1).clear();
        cy.get('input').eq(1).type(0);
        cy.contains('Удалить по индексу').click();
        cy.wait(DELAY_IN_MS);
        cy.wait(DELAY_IN_MS);
        cy.wait(DELAY_IN_MS);
        cy.get('[class*=circle_content]').each((element, index) => {
            if (index === 0) cy.wrap(element).contains('2');
        });
    });
})