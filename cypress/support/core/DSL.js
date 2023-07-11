/// <reference types = "cypress"/>

export default class DSL {

    type($element, text) {
        cy.get($element)
            .should('be.visible')
            .first()
            .clear({ force: true })
            .type(text);
    }

    click($element) {
        cy.get($element)
            .should('be.visible')
            .click({ force: true });
    }

}
