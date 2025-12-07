import { faker  } from '@faker-js/faker'

class Cadastro {
  preencherFormularioCadastro(senha, firstName, lastName) {
    cy.contains('Title').should('be.visible')
    cy.get('#id_gender1').check()

    cy.get('input#password').type(senha, { log: false })

    cy.get('select[data-qa=days]').select('6')
    cy.get('select[data-qa=months]').select('March')
    cy.get('select[data-qa=years]').select('1989')

    cy.get('input[type=checkbox]#newsletter').check()
    cy.get('input[type=checkbox]#optin').check()

    cy.get('input#first_name').type(firstName)
    cy.get('input#last_name').type(lastName)
    cy.get('input#company').type(faker.company.name())
    cy.get('input#address1').type(faker.location.streetAddress())
    cy.get('select#country').select('India')
    cy.get('input#state').type(faker.location.state())
    cy.get('input#city').type(faker.location.city())
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number())

    cy.get('[data-qa="create-account"]').click()

    cy.contains('b', 'Account Created!').should('be.visible')

  }
}

export default new Cadastro()