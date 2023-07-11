/// <reference types="cypress"/>

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Modal from "../page_objects/Modal.page";
const modal = new Modal();

Then("the modal should show {string} message", (text) => {
    modal.verifyText(text);
    modal.clickCloseButton();
});

