/// <reference types="cypress"/>

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import Home from "../page_objects/Home.page";
import Transfer from "../page_objects/Transfer.page";

const home = new Home();
const transfer = new Transfer();

Then("the page should show the user number {string} information", (num) => {
    cy.fixture('bugBank/users.json').then(users => {
        const {
            full_name,
            account: {
                number,
                digit,
                amount
            }
        } = users.find(user => user.id === Number(num));
        home.verifyAccountNumber(`${number}-${digit}`);
        home.verifyUserName(full_name);
        home.verifyWellcome();
        home.verifyBalanceText(amount);
    });
});

Then("the page should show the {string} of Balance left", (amount) => {
    transfer.gotoHome();
    home.verifyBalanceText(amount);
});

Given("I click on log out button", () => {
    home.clickLogOutButton();
});

