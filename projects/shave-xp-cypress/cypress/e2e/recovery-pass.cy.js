import fpPage from '../support/pages/forgot-pass'

describe('Esqueci minha senha', () => {

	it('Deve poder recuperar a senha', () => {

		const user = {
			name: 'Esquecido',
			email: 'esquecido@gmail.com',
			password: 'pwd123',
			is_shaver: false
		}

		cy.createUser(user)

		fpPage.go()
		fpPage.submit(user.email)

		const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
		fpPage.noticeShouldBe(message)
	})

})