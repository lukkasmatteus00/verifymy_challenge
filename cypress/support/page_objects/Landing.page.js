/// <reference types = "cypress"/>

export default class Landing {

    setEmail(email) {
        cy.get(`[name="email"]`)
            .first()
            .clear({ force: true })
            .type(email);
    }

    setPassword(password) {
        cy.get(`[name="password"]`)
            .first()
            .clear({ force: true })
            .type(password);
    }

    clickLogInButton() {
        cy.get(`.login__buttons [type="submit"]`)
            .click();
    }

    clickSignInButton() {
        cy.get(`.login__buttons [type="button"]`)
            .click();
    }
}
