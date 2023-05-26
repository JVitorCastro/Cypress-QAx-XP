import fpPage from '../support/pages/forgot-pass'
import rpPage from '../support/pages/reset-pass'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

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
			rpPage.go(Cypress.env('passToken'))
			rpPage.submit('abc123', 'abc123')
			const message = 'Agora você já pode logar com a sua nova senha secreta.'
			rpPage.noticeShouldBe(message)

		})

		afterEach(() => {
			loginPage.submit(user.email, 'abc123')
			shaversPage.header.userShouldBeLoggedIn(user.name)
		})
	})


})