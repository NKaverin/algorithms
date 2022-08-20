export const host = 'http://localhost:3000';

describe('Приложение', function() {
    it('доступно', function() {
        cy.visit(host);
    });
});