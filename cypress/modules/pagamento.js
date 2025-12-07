class Pagamento {

    preencherDadosPagamento(numeroCartao, cvc, expiryMonth, expiryYear) {
        cy.get('[data-qa="name-on-card"]').type('Card QA');
        cy.get('[data-qa="card-number"]').type(numeroCartao);
        cy.get('[data-qa="cvc"]').type(cvc);
        cy.get('[data-qa="expiry-month"]').type(expiryMonth);
        cy.get('[data-qa="expiry-year"]').type(expiryYear);

        cy.get('[data-qa="pay-button"]').click();
    }

    verificarPaginaPagamento() {
        cy.url().should('include', '/payment');
        cy.get('.active').should('have.text', 'Payment');
    }
}

export default new Pagamento();