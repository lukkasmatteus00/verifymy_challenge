/// <reference types = "cypress"/>

export default class Modal {

    verifyText(text) {
        cy.get(`[id="modalText"]`)
        .should($el => expect($el.text().trim()).to.deep.equal(text, "Check modal's message"));
    }

    getText() {
        return cy.get('[id = "modalText"]')
            .then(($elem) => {
                return $elem.text();
            });
    }

    clickCloseButton() {
        cy.get(`[id="btnCloseModal"]`)
            .click();
    }

}
