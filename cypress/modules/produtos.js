class ProductsPage {

    verificarPaginaProdutos() {
    cy.url().should('include', '/products');
    cy.get('h2.title.text-center').should('have.text', 'All Products');
  } 

  clicarPrimeiroProduto() {
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
  }

  verificarDetalhesProduto() {
    cy.get('.product-information > h2').should('have.text', 'Blue Top')
    cy.get('.product-information > :nth-child(3)').should('contain.text', 'Category: Women > Tops')
    cy.get('.product-information > :nth-child(5)').should('contain.text', 'Rs. 500')
    cy.get('.product-information > :nth-child(6)').should('contain.text', 'Availability: In Stock')
    cy.get('.product-information > :nth-child(7)').should('contain.text', 'Condition: New')
    cy.get('.product-information > :nth-child(8)').should('contain.text', 'Brand: Polo')
  }

  procurarProduto(nomeProduto) {
    cy.get('#search_product').type(nomeProduto);
    cy.get('#submit_search').click();
    cy.get('.title').should('contain.text', 'Searched Products');
  }

  adicionarProdutoAoCarrinho() {
    cy.get('.productinfo > .btn').should('be.visible');
    cy.get('.productinfo > .btn').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content .btn-success').click();
  }

  verificarModalAdicionado() {
    cy.get('.modal-title').should('have.text', 'Added!');
    cy.get('u').should('have.text', 'View Cart');
    cy.get('.modal-footer > .btn').should('have.text', 'Continue Shopping');
  }

}

export default new ProductsPage();