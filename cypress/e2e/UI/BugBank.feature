# Author: Lucas Matheus de souza Pereira
# language: en
@cypress @javascript @bugBank
Feature: Register new accounts

  Background:
    Given I am on the bugbank page
    And I want to create "2" user accounts with balance
    When I log in using the user number "1" credentials
    Then the page should show the user number "1" information

  @createUserAccount @transfer @E2E
  Scenario: Create 2 user accounts, send a transfer for them, and check the transfer details on the statement in both user accounts
    When I transfer "500" to user account "2"
    Then the modal should show "Transferencia realizada com sucesso" message
    And the page should show the "500,00" of Balance left
    And the system should show transfer details on the statement
      | transactionType       | TransactionDescription          | transactionValue | availableBalance |
      | Abertura de conta     | Saldo adicionado ao abrir conta | R$ 1.000,00      | R$ 500,00        |
      | Transferência enviada | cypress automation              | -R$ 500,00       | R$ 500,00        |
    Given I click on log out button
    When I log in using the user number "2" credentials
    Then the system should show transfer details on the statement
      | transactionType        | TransactionDescription          | transactionValue | availableBalance |
      | Abertura de conta      | Saldo adicionado ao abrir conta | R$ 1.000,00      | R$ 1.500,00      |
      | Transferência recebida | cypress automation              | R$ 500,00        | R$ 1.500,00      |

