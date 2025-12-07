import userData from '../fixtures/users.json'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import produto from '../modules/produtos'
import carrinho from '../modules/carrinho'
import checkout from '../modules/checkout'
import pagamento from '../modules/pagamento'
import { faker } from '@faker-js/faker'
import { gerarUsuario, gerarCartao } from '../support/geradorDados';

let usuario;
let cartao;

describe('Exercicios Cypress', () => {
  beforeEach(() => {
    usuario = gerarUsuario();
    cartao = gerarCartao();

    cy.visit('https://automationexercise.com/');
  });

  it('Test Case 1: Register User', () => {
    menu.navegarParaLogin()

    login.preencherFormularioPreCadastro(usuario.nomeCompleto, usuario.email)
    cadastro.preencherFormularioCadastro(usuario.senha, usuario.firstName, usuario.lastName)

    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()

    cy.contains('a', 'Logout', { timeout: 10000 }).should('be.visible')
    cy.contains(`Logged in as ${usuario.nomeCompleto}`, { timeout: 10000 }).should('exist')

    menu.deletarConta()
    cy.get('[data-qa="continue-button"]').click()
  })

  it('Test Case 2: Login User with correct email and password', () => {

    cy.criarUsuario(usuario)

    menu.efetuarLogout()

    login.preencherFormularioLogin(usuario.email, usuario.senha)
    
    cy.contains('a', 'Logout', { timeout: 10000 }).should('be.visible')
    cy.contains(`Logged in as ${usuario.nomeCompleto}`, { timeout: 10000 }).should('exist')

    menu.deletarConta()
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.navegarParaLogin()

    login.preencherFormularioLogin("invalid@email.com", "invalidPassword123")

    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
  });

  it('Test Case 4: Logout User', () => {

    cy.criarUsuario(usuario)

    menu.efetuarLogout()

    login.preencherFormularioLogin(usuario.email, usuario.senha)

    menu.efetuarLogout()

    cy.url().should('contain', 'login')
    cy.contains('Login to your account')
    cy.contains('a', 'Logout').should('not.exist')
    cy.contains('a', 'Signup / Login').should('be.visible')
  });

  it('Test Case 5: Register User with existing email', () => {
    const nome = userData.firstname
    const email = userData.email

    menu.navegarParaLogin()

    login.preencherFormularioPreCadastro(nome, email)

    cy.contains('button', 'Signup').click()
    cy.get('.signup-form > form > p').should('contain.text', 'Email Address already exist!')
  });

  it('Test Case 6: Contact Us Form', () => {

    menu.navegarParaContactUs()

    cy.get('[data-qa="name"]').type(userData.name || 'QA Tester')
    cy.get('[data-qa="email"]').type(userData.email || 'qa@test.com')
    cy.get('[data-qa="subject"]').type(userData.subject || 'Assunto')
    cy.get('[data-qa="message"]').type(userData.message || 'Mensagem de teste')

    cy.get('input[type=file]').selectFile('cypress/fixtures/users.json')

    cy.get('[data-qa="submit-button"]').click()

    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.navegarParaProducts()

    produto.verificarPaginaProdutos()
    produto.clicarPrimeiroProduto('Blue Top')

    produto.verificarDetalhesProduto()
  });

  it('Test Case 9: Search Product', () => {
    menu.navegarParaProducts()

    produto.verificarPaginaProdutos()
    produto.procurarProduto('Blue Top')

    cy.scrollTo(0, 300);

    cy.get('.productinfo > p').should('have.text', 'Blue Top')
  })

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.scrollTo('bottom');

    cy.get('.single-widget > h2').should('have.text', 'Subscription');
    cy.get('#susbscribe_email').type(faker.internet.email());
    cy.get('#subscribe').click();

    cy.get('.alert-success').should('be.visible').and('contain.text', 'You have been successfully subscribed!')
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {

    cy.criarUsuario(usuario)

    menu.navegarParaProducts()

    produto.verificarPaginaProdutos()
    produto.procurarProduto('Blue Top')

    produto.adicionarProdutoAoCarrinho()
    produto.verificarModalAdicionado()

    cy.scrollTo('top');
    menu.navegarParaCarrinho()

    carrinho.verificarPaginaCarrinho()
    carrinho.procederParaCheckout()

    checkout.verificarPaginaCheckout()
    checkout.verificarItem()

    checkout.verificarDetalhesEndereco(usuario.firstName, usuario.lastName)

    cy.scrollTo(0, 600);

    checkout.clicarEmPlaceOrder()

    pagamento.preencherDadosPagamento(
      cartao.numero,
      cartao.cvv,
      cartao.mes,
      cartao.ano
    );

    cy.get('[data-qa="order-placed"] > b').should('have.text', 'Order Placed!')
    cy.get('.col-sm-9 > p').should('contain.text', 'Congratulations! Your order has been confirmed!')

    menu.deletarConta()
  });
});