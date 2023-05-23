import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('Quando submeto o formulário', () => {
        it('Deve logar com sucesso no sistema', () => {
            const user = {
                name: 'João',
                email: 'srvitorcastro@gmail.com',
                password: 'Jv@81231120'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'João',
                email: 'srvitorcastro@gmail.com',
                password: '231120',
                message: 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            }

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(user.message)

        })

        it('não deve logar com email não cadastrado',() => {
            const user = {
                name: 'João',
                email: 'srvitorcastro@404.com',
                password: '231120',
                message: 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            }

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(user.message)
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
        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p)=> {
            it(`Não deve logar com a senha: ${p}`, () => {
                loginPage.submit('teste@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('Email no formato incorreto', () => {
        const email = [
            'teste.com.br',
            '@gmail.com',
            'teste#gmail.com',
            '@',
            'teste@',
            '1321654',
            '#!$@#%$!#$',
            'xpto123'
        ]

        email.forEach((e)=> {
            it(`Não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })

})