class LoginPage {

    // Função para realizar o login
    submit(email = null, password = null) {
        cy.visit('/')
        cy.get('input[placeholder="Seu email"]').as('email')
        cy.get('input[placeholder*=senha]').as('password')

        if (email) {
            cy.get('@email').type(email)
        }
        if (password){
            cy.get('@password').type(password)
        }
        cy.contains('button', 'Entrar').click()
    }

    noticeShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }
}

export default new LoginPage()