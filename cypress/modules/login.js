class Login {
      
  preencherFormularioPreCadastro(nome, email) {
    cy.contains('New User Signup!').should('be.visible')
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)

    cy.contains('button', 'Signup').click()
  }

  preencherFormularioLogin(email, senha) {
    cy.get(`[data-qa="login-email"]`).type(email)
    cy.get(`[data-qa="login-password"]`).type(senha)

    cy.get(`[data-qa="login-button"]`).click()
  }
}

export default new Login()