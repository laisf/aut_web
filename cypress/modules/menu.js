class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click()
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click()
  }

  deletarConta() {
    cy.get('a[href="/delete_account"]').should('be.visible').click()
    cy.get('b').should('contain.text', 'Account Deleted!')
  }

  navegarParaContactUs() {
    cy.get('a[href="/contact_us"]').click()
    cy.get('div.contact-form > .title').should('be.visible')
  }

  navegarParaProducts() {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
    cy.get('h2.title.text-center').should('have.text', 'All Products')
  }

  navegarParaCarrinho() {
    cy.get('a[href="/view_cart"]').first().click()
    cy.url().should('include', '/view_cart')
    cy.get('.active').should('have.text', 'Shopping Cart')
  }
}

export default new Menu()