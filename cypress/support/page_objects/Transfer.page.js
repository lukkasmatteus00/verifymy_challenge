/// <reference types = "cypress"/>

export default class Transfer {

    setAccountNumber(accountNumber) {
        cy.get(`[type="accountNumber"]`)
            .type(accountNumber);
    }

    setDigit(digit) {
        cy.get(`[type="digit"]`)
            .type(digit);
    }

    setTransferValue(transferValue) {
        cy.get(`[type="transferValue"]`)
            .type(transferValue);
    }

    setDescription(description) {
        cy.get(`[type="description"]`)
            .type(description);
    }

    verifyTransferInformation() {
        cy.get(`#__next p:nth-child(2)`)
            .first()
            .should($el => expect($el.text().trim()).to.deep.equal(
                `Realize transferência de valores entre contas BugBank com taxa 0 e em poucos segundos.`,
                 'Check transfer description'));
    }

    clickTransferNowButton() {
        cy.get(`[type="submit"]`)
            .click();
    }

    gotoHome() {
        cy.get(`[id="btnBack"]`)
            .click();
    }

}
