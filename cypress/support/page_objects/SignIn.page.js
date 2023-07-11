/// <reference types = "cypress"/>

export default class SignIn {

    setEmail(email) {
        cy.get(`[name="email"]`)
            .last()
            .clear({ force: true })
            .type(email, { force: true });
    }

    setName(name) {
        cy.get(`[type="name"]`)
            .first()
            .clear({ force: true })
            .type(name, { force: true });
    }

    setPassword(password) {
        cy.get(`[name="password"]`)
            .last()
            .clear({ force: true })
            .type(password, { force: true });
    }

    setPasswordConfirmation(password) {
        cy.get(`[name="passwordConfirmation"]`)
            .first()
            .clear({ force: true })
            .type(password, { force: true });
    }

    clickAddBalance() {
        cy.get(`[id="toggleAddBalance"]`)
            .click({ force: true });
    }

    clickSignInButton() {
        cy.get(`[type="submit"]`)
            .last()
            .click({ force: true });
    }

    gotoLandingPage() {
        cy.get(`[id="btnBackButton"]`)
            .click({ force: true });
    }
}
