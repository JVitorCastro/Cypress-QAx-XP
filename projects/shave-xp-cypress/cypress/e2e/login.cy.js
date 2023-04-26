describe('login', () => {

    context('Quando submeto o formulário', () => {
        it('Deve logar com sucesso no sistema', function () {
            const user = {
                name: 'João',
                email: 'srvitorcastro@gmail.com',
                password: 'Jv@81231120'
            }

            cy.visit('http://localhost:3000')
            cy.get('input[placeholder="Seu email"]').type(user.email)
            // O seletor abaixo procura por um placeholder que contém "senha"
            cy.get('input[placeholder*=senha]').type(user.password)
            // O seletor abaixo procura por um placeholder que termina com "secreta"
            // cy.get('input[placeholder$=secreta]').type(user.password)
            // O seletor abaixo procura por um placeholder que começa com "sua"
            // cy.get('input[placeholder^=sua]').type(user.password)

            cy.contains('button', 'Entrar').click()
            cy.get('.logged-user div a')
                .should('be.visible')
                .should('have.text', 'Olá, ' + user.name)
        });

        it('não deve logar com senha incorreta', function () {
            const user = {
                name: 'João',
                email: 'srvitorcastro@gmail.com',
                password: '231120',
                message: 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            }

            cy.visit('http://localhost:3000')
            cy.get('input[placeholder="Seu email"]').type(user.email)
            cy.get('input[placeholder*=senha]').type(user.password)
            cy.contains('button', 'Entrar').click()
            cy.get('.notice-container')
                .should('be.visible')
                .find('.error p')
                .should('have.text', user.message)

        });

        it('não deve logar com email não cadastrado', function () {
            const user = {
                name: 'João',
                email: 'srvitorcastro@404.com',
                password: '231120',
                message: 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            }

            cy.visit('http://localhost:3000')
            cy.get('input[placeholder="Seu email"]').type(user.email)
            cy.get('input[placeholder*=senha]').type(user.password)
            cy.contains('button', 'Entrar').click()
            cy.get('.notice-container')
                .should('be.visible')
                .find('.error p')
                .should('have.text', user.message)

        });
        
    })

})