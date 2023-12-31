/// <reference types="cypress"/>
import { requestHeaderInfo } from '../../../support/helpers/utils';

const Leite = require('leite');

const leite = new Leite();
const path = "cypress/fixtures/serverest";

describe(`
    - Creating automated tests to exercise the verbs GET, POST, PUT, and DELETE for the service "login";
    - After the tests are finished all data generated by them will be deleted; `, () => {

    before('Create a new user for the tests', () => {
        cy.fixture('password.json').then(password => {
            const payload = {
                nome: leite.pessoa.nome(),
                email: leite.pessoa.email(),
                password: password.password,
                administrador: "true"
            };

            cy.request(
                requestHeaderInfo({
                    path: '/usuarios',
                    payload: payload
                }).POST()
            ).then(response => {
                payload._id = response.body._id;
                cy.writeFile(`${path}/user.json`, payload);
            });
        })
    });

    it('Verify that is possible to log in use valid credentials', () => {
        cy.fixture('serverest/user.json').then(user => {
            const { email, password } = user
            cy.request(
                requestHeaderInfo({
                    path: '/login',
                    payload: {
                        email: email,
                        password: password
                    }
                }).POST()
            ).then(response => {
                const { status, body } = response;
                expect(status).to.be.equal(200, 'check the status code');

                expect(body).to.haveOwnProperty('message', "Login realizado com sucesso", 'Check the message');
                expect(body, 'check if the attribute exists').to.haveOwnProperty('authorization');
            });
        })
    });

    it('Verify that is not possible to login use invalid credentials', () => {
        cy.request(
            requestHeaderInfo({
                path: '/login',
                payload: {
                    email: leite.pessoa.email(),
                    password: leite.pessoa.cpf()
                }
            }).POST()
        ).then(response => {
            const { status, body } = response;
            expect(status).to.be.equal(401, 'check the status code');

            expect(body).to.haveOwnProperty('message', "Email e/ou senha inválidos", 'Check the message');
            expect(body, 'check if the attribute doesnt exists').to.not.haveOwnProperty('authorization');
        });
    });

    it('Verify that the email and password are mandatory', () => {
        cy.request(
            requestHeaderInfo({
                path: '/login'
            }).POST()
        ).then(response => {
            const { status, body } = response;
            expect(status).to.be.equal(400, 'check the status code');

            expect(body).to.haveOwnProperty('email', 'email é obrigatório', 'Check the email attribute');
            expect(body).to.haveOwnProperty('password', 'password é obrigatório', 'Check the password attribute');
            expect(body, 'check if the attribute doesnt exists').to.not.haveOwnProperty('authorization');
        });
    });

    after('Deleting all test data that was used by the tests', () => {
        cy.fixture('serverest/user.json').then(user => {
            cy.request(
                requestHeaderInfo({
                    path: `/usuarios/${user._id}`
                }).DELETE()
            ).then(response => {
                const { status, body } = response;
                expect(status).to.be.equal(200, 'check the status code');

                expect(body).to.haveOwnProperty('message', "Registro excluído com sucesso", 'Check the message');
            });
        });
    });
});