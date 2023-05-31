import data from '../fixtures/users-login.json'

describe('login', () => {

  context('Quando submeto o formulário', () => {
    it('Deve logar com sucesso no sistema', () => {
      // O código abaixo utiliza fixtures para acessar os dados do teste
      // cy.fixture('users-login').then(function (data){
      //     loginPage.submit(data.email, data.password)
      //     shaversPage.header.userShouldBeLoggedIn(data.name)
      // })
      const user = data.success
      cy.createUser(user)

      // loginPage.submit(data.success.email, data.success.password)
      // shaversPage.header.userShouldBeLoggedIn(user.name)
      cy.submitLogin(user.email, user.password)
      cy.userShouldBeLoggedIn(user.name)
    })

    it('não deve logar com senha incorreta', () => {
      const user = data.invpass

      cy.submitLogin(user.email, user.password)
      // loginPage.shared.noticeErrorShouldBe(user.message)
      cy.noticeErrorShouldBe(user.message)
    })

    it('não deve logar com email não cadastrado',() => {
      const user = data.email404

      cy.submitLogin(user.email, user.password)
      // loginPage.shared.noticeErrorShouldBe(user.message)
      cy.noticeErrorShouldBe(user.message)
    })

    it('campos obrigatórios', () => {
      cy.submitLogin()

      cy.get('.alert-error')
			.should('have.length', 2)
			.and(($small) => {
				expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
				expect($small.get(1).textContent).to.equal('Senha é obrigatória')
			})

      // cy.contains('.alert-error', 'E-mail é obrigatório')
      //     .should('be.visible')
      // cy.contains('.alert-error', 'Senha é obrigatória')
      //     .should('be.visible')
    })
  })

  context('Senha muito curta', () => {
    data.shortpass.forEach((p)=> {
      it(`Não deve logar com a senha: ${p}`, () => {
        cy.submitLogin('teste@gmail.com', p)
        cy.alertShouldBe('Pelo menos 6 caracteres')
      })
    })
  })

  context('Email no formato incorreto', () => {
    data.invemails.forEach((e)=> {
      it(`Não deve logar com o email: ${e}`, () => {
        cy.submitLogin(e, 'pwd123')
        cy.alertShouldBe('Informe um email válido')
      })
    })
  })

})