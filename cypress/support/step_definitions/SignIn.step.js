/// <reference types="cypress"/>

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import SignIn from "../page_objects/SignIn.page";
import Landing from "../page_objects/Landing.page";
import Modal from "../page_objects/Modal.page";

const Leite = require('leite');

const leite = new Leite();
const singIn = new SignIn();
const modal = new Modal();
const landing = new Landing();

Given("I want to create {string} user accounts with balance", (number) => {
    createUser(number);
});

Given("I want to create {string} user accounts without balance", (number) => {
    createUser(number, false);
});

function createUser(number, balance = true) {
    const users = [];
    for (let num = 1; num <= Number(number); num++) {
        landing.clickSignInButton();

        let email = leite.pessoa.email();
        let name = leite.pessoa.nome();

        singIn.setEmail(email);
        singIn.setName(name);

        cy.fixture('password.json').then(password => {
            singIn.setPassword(password.password);
            singIn.setPasswordConfirmation(password.password);
        })

        if (balance && num === 1) singIn.clickAddBalance();

        singIn.clickSignInButton();

        modal.getText().then(text => {
            const account = text.replace(/[^0-9]/g, '');
            const number = Number(account.toString().slice(0, -1));
            const digit = String(account).slice(-1);

            users.push({
                id: num,
                email: email,
                full_name: name,
                account: {
                    number: number,
                    digit: digit,
                    amount: balance ? '1.000,00' : '00,00'
                }
            });
        });

        modal.clickCloseButton();

    }
    cy.writeFile("cypress/fixtures/bugBank/users.json", users);
}