describe('Esqueci minha senha', () => {

	it('Deve poder recuperar a senha', () => {

		const user = {
			name: 'Esquecido',
			email: 'esquecido@gmail.com',
			password: 'pwd123',
			is_shaver: false
		}

		cy.createUser(user)

		cy.requestPassword(user.email)

		const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
		cy.noticeSuccessShouldBe(message)
	})

	context('Quando o usuário solicita resgate de senha', () => {
		const user = {
			name: 'Will S',
			email: 'will@gmail.com',
			password: 'abc123',
			is_shaver: false
		}

		beforeEach(() => {
			cy.createUser(user)
			cy.recoveryPass(user.email)
			cy.getToken(user.email)

		})

		it('Deve poder cadastrar uma nova senha', () => {

			cy.resetPassword(Cypress.env('passToken'), 'abc123', 'abc123')

			const message = 'Agora você já pode logar com a sua nova senha secreta.'
			cy.noticeSuccessShouldBe(message)

		})

		afterEach(() => {
      cy.submitLogin(user.email, 'abc123')
      cy.userShouldBeLoggedIn(user.name)
		})
	})


})