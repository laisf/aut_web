class Checkout {
  verificarPaginaCheckout() {
    cy.url().should('include', '/checkout');
    cy.get('.active').should('have.text', 'Checkout');
  }

  verificarDetalhesEndereco(firstname, lastname) {
    cy.get('#address_delivery > .address_title > .page-subheading').should('be.visible');
    cy.get('#address_delivery > .address_firstname').should('contains.text', `${firstname} ${lastname}`);
    cy.get('#address_delivery > :nth-child(3)').should('be.visible');
    cy.get('#address_delivery > :nth-child(4)').should('be.visible');
    cy.get('#address_delivery > .address_city').should('be.visible');
    cy.get('#address_delivery > .address_country_name').should('be.visible');
    cy.get('#address_delivery > .address_phone').should('be.visible');
  }
      
  verificarItem() {
    cy.get('h4 > a').should('be.visible');
    cy.get(':nth-child(4) > .cart_total_price').should('be.visible');
  }
 
  clicarEmPlaceOrder() {
    cy.get(':nth-child(8) > .btn').click();
  }
  

}

export default new Checkout();