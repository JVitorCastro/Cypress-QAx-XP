import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/users-login.json'

describe('login', () => {

  context('Quando submeto o formulário', () => {
    it('Deve logar com sucesso no sistema', () => {
      // O código abaixo utiliza fixtures para acessar os dados do teste
      // cy.fixture('users-login').then(function (data){
      //     loginPage.submit(data.email, data.password)
      //     shaversPage.header.userShouldBeLoggedIn(data.name)
      // })

      cy.createUser(data.success)

      loginPage.submit(data.success.email, data.success.password)
      shaversPage.header.userShouldBeLoggedIn(data.success.name)
    })

    it('não deve logar com senha incorreta', () => {
      loginPage.submit(data.invpass.email, data.invpass.password)
      loginPage.noticeShouldBe(data.invpass.message)

    })

    it('não deve logar com email não cadastrado',() => {

      loginPage.submit(data.email404.email, data.email404.password)
      loginPage.noticeShouldBe(data.email404.message)
    })

    it('campos obrigatórios', () => {
      loginPage.submit()

      // cy.contains('.alert-error', 'E-mail é obrigatório')
      //     .should('be.visible')
      // cy.contains('.alert-error', 'Senha é obrigatória')
      //     .should('be.visible')

      loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
    })
  })

  context('Senha muito curta', () => {
    data.shortpass.forEach((p)=> {
      it(`Não deve logar com a senha: ${p}`, () => {
        loginPage.submit('teste@gmail.com', p)
        loginPage.alertShouldBe('Pelo menos 6 caracteres')
      })
    })
  })

  context('Email no formato incorreto', () => {
    data.invemails.forEach((e)=> {
      it(`Não deve logar com o email: ${e}`, () => {
        loginPage.submit(e, 'pwd123')
        loginPage.alertShouldBe('Informe um email válido')
      })
    })
  })

})