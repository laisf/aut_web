import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'

Cypress.Commands.add("criarUsuario", (usuario) => {
  menu.navegarParaLogin();

  login.preencherFormularioPreCadastro(usuario.nomeCompleto, usuario.email);

  cadastro.preencherFormularioCadastro(usuario.senha, usuario.firstName, usuario.lastName);

  cy.get('[data-qa="continue-button"]').click();
});
