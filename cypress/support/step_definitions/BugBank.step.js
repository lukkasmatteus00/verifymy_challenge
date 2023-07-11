/// <reference types="cypress"/>

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Landing from "../page_objects/Landing.page";
const landing = new Landing();

Given("I am on the bugbank page", () => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.visit(Cypress.env("bugBank"));
});

When("I log in using the user number {string} credentials", (number) => {
    cy.fixture('bugBank/users.json').then(users => {
        const { email } = users.find(user => user.id === Number(number));
        landing.setEmail(email);
    });
    cy.fixture('password.json').then(password => {
        landing.setPassword(password.password);
    });
    landing.clickLogInButton();
});



