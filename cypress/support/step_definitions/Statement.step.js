/// <reference types="cypress"/>

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Home from "../page_objects/Home.page";
import Statement from "../page_objects/Statement.page";
import date from "date-and-time";

const home = new Home();
const statement = new Statement();

Then("the system should show transfer details on the statement", (datatable) => {
    home.gotoStatement();

    datatable.hashes().forEach(row => {
        statement.verifyTransactionDescription(row.TransactionDescription);
        statement.verifyTransactionType(row.transactionType);
        statement.verifyTransactionValue(row.transactionValue);
        statement.verifyAvailableBalance(row.availableBalance);
    });

    const dateTime = date.format(new Date(), 'DD/MM/YYYY');
    statement.verifyTransactionDate(dateTime);
    statement.gotoHome()
});

