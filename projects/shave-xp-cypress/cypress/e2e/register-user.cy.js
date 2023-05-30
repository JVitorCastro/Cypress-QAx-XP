import registerUserPage from '../support/pages/register-user'
import data from '../fixtures/user-register.json'

describe('Faça seu cadastro', () => {
  context('Quando submeto o formulário', () => {
    it('deve cadastrar usuário com sucesso', () => {
      const user = data.success

      registerUserPage.go()

      cy.deleteUser(user)

      registerUserPage.submit(user.name, user.email, user.password)

      const message = 'Boas vindas, faça login para solicitar serviços!'
      registerUserPage.noticeShouldBe(message)
    })

    it('Não deve recadastrar um email que já existe', () => {
      const user = data.sameEmail

      registerUserPage.go()

      cy.createUser(user)

      registerUserPage.submit(user.name, user.email, user.password)

      const message = 'Oops! E-mail já cadastrado.'
      registerUserPage.noticeShouldBe(message)
    })

    it('campos obrigatórios', () => {
      registerUserPage.submit()

      registerUserPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
    })

  })

  context('Senha muito curta', () => {
    data.shortpass.forEach((p) => {
      it(`Não deve cadastrar com a senha: ${p}`, () => {
        registerUserPage.submit('Papito Rocks', 'papito@teste.com.br', p)
        registerUserPage.alertShouldBe('Pelo menos 6 caracteres')
      })
    })
  })

  context('email no formato incorreto', () => {
    data.invemail.forEach((e) => {
      it(`Não deve cadastrar com o email: ${e}`, () => {
        registerUserPage.submit('Agatha França', e, 'pwd123')
        registerUserPage.alertShouldBe('Informe um email válido')
      });
    })
  })
})
