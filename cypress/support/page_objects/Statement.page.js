/// <reference types = "cypress"/>

export default class Statement {

    verifyAvailableBalance(text) {
        cy.get(`[id="textBalanceAvailable"]`)
            .should('be.visible')
            .contains(text);
    }

    verifyTransactionDate(text) {
        cy.get(`[id="textDateTransaction"]`)
            .should('be.visible')
            .contains(text);
    }

    verifyTransactionType(text) {
        cy.get(`[id="textTypeTransaction"]`)
            .should('be.visible')
            .contains(text);
    }

    verifyTransactionDescription(text) {
        cy.get(`[id="textDescription"]`)
            .should('be.visible')
            .contains(text);
    }

    verifyTransactionValue(text) {
        cy.get(`[id="textTransferValue"]`)
            .should('be.visible')
            .contains(text);
    }

    gotoHome() {
        cy.get(`[id="btnBack"]`)
            .click();
    }

}
