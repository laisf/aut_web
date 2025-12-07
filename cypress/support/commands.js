Cypress.Commands.add('navegarParaLogin', () => {
  cy.get('a[href="/login"]').click()
})