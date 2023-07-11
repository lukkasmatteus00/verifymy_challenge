/// <reference types="cypress"/>

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Home from "../page_objects/Home.page";
import Transfer from "../page_objects/Transfer.page";

const home = new Home();
const transfer = new Transfer();

Given("I transfer {string} to user account {string}", (amount, userNumber) => {
    home.gotoWireTransfer();
    transfer.verifyTransferInformation();

    cy.fixture('bugBank/users.json').then(users => {
        const {
            account: {
                number,
                digit
            }
        } = users.find(user => user.id === Number(userNumber));
        transfer.setAccountNumber(number);
        transfer.setDigit(digit);
    });

    transfer.setTransferValue(amount);
    transfer.setDescription('cypress automation');
    transfer.clickTransferNowButton();
});

