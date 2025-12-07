class Carrinho {
    
    verificarPaginaCarrinho() {
        cy.url().should('include', '/view_cart');
        cy.get('.active').should('have.text', 'Shopping Cart');
    }  
    procederParaCheckout() {
        cy.get('.col-sm-6 > .btn').click();
    }

 
}

export default new Carrinho();