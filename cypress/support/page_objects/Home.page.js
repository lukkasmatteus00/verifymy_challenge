/// <reference types = "cypress"/>

export default class Home {

    verifyBalanceText(balance) {
        cy.get(`[id="textBalance"]`)
            .should('be.visible')
            .contains(`Saldo em conta R$ ${balance}`);
    }

    verifyUserName(name) {
        cy.get(`[id="textName"]`)
            .should($el => expect($el.text().trim()).to.contain(`Olá ${name}`, 'Check user name'));
    }

    verifyWellcome() {
        cy.get(`#__next p:nth-child(2)`)
            .first()
            .should($el => expect($el.text().trim()).to.contain(`bem vindo ao BugBank :)`, 'Check wellcome text'));
    }

    verifyAccountNumber(accountNumber) {
        cy.get(`[id="textAccountNumber"]`)
            .should($el => expect($el.text().trim()).to.contain(`Conta digital: ${accountNumber}`, 'Check account number'));
    }

    clickLogOutButton() {
        cy.get(`[id="btnExit"]`)
            .click();
    }

    gotoWireTransfer() {
        cy.get(`[id="btn-TRANSFERÊNCIA"]`)
            .click();
    }

    gotoStatement() {
        cy.get(`[id="btn-EXTRATO"]`)
            .click();
    }

}
