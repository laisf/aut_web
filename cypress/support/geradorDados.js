import { faker } from '@faker-js/faker';

class GeradorDados {

  gerarUsuario() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      nomeCompleto: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: `${faker.internet.userName()}${faker.string.numeric(4)}@mail.com`,
      senha: faker.internet.password(),
    };
  }

  gerarCartao() {
    const currentYear = new Date().getFullYear();

    return {
      numero: faker.finance.creditCardNumber(),
      cvv: faker.string.numeric(3),
      mes: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
      ano: faker.number.int({ min: currentYear + 1, max: currentYear + 10 }),
    };
  }

  gerarTelefone() {
    return faker.string.numeric(9);
  }
}

export default new GeradorDados();
