import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('Quando submeto o formulário', () => {
        it('Deve logar com sucesso no sistema', function () {
            const user = {
                name: 'João',
                email: 'srvitorcastro@gmail.com',
                password: 'Jv@81231120'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        });

        it('não deve logar com senha incorreta', function () {
            const user = {
                name: 'João',
                email: 'srvitorcastro@gmail.com',
                password: '231120',
                message: 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            }

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(user.message)

        });

        it('não deve logar com email não cadastrado', function () {
            const user = {
                name: 'João',
                email: 'srvitorcastro@404.com',
                password: '231120',
                message: 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            }

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(user.message)
        });

        it('campos obrigatórios', function () {
            loginPage.submit()

            // cy.contains('.alert-error', 'E-mail é obrigatório')
            //     .should('be.visible')
            // cy.contains('.alert-error', 'Senha é obrigatória')
            //     .should('be.visible')

            cy.get('.alert-error')
                .should('have.length', 2)
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(1).textContent).to.equal('Senha é obrigatória')
                })
        });

    })

})