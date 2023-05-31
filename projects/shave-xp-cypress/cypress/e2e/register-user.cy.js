import data from '../fixtures/user-register.json'

describe('Faça seu cadastro', () => {
  context('Quando submeto o formulário', () => {
    it('deve cadastrar usuário com sucesso', () => {
      const user = data.success

      cy.deleteUser(user)

      cy.signup(user.name, user.email, user.password)

      const message = 'Boas vindas, faça login para solicitar serviços!'
      cy.noticeSuccessShouldBe(message)
    })

    it('Não deve recadastrar um email que já existe', () => {
      const user = data.sameEmail

      cy.createUser(user)

      cy.signup(user.name, user.email, user.password)

      const message = 'Oops! E-mail já cadastrado.'
      cy.noticeErrorShouldBe(message)
    })

    it('campos obrigatórios', () => {
      cy.signup()

      cy.get('.alert-error')
        .should('have.length', 3)
        .and(($small) => {
          expect($small.get(0).textContent).to.equal('Nome é obrigatório')
          expect($small.get(1).textContent).to.equal('E-mail é obrigatório')
          expect($small.get(2).textContent).to.equal('Senha é obrigatória')
        })
    })

  })

  context('Senha muito curta', () => {
    data.shortpass.forEach((p) => {
      it(`Não deve cadastrar com a senha: ${p}`, () => {
        cy.signup('Papito Rocks', 'papito@teste.com.br', p)
        cy.alertShouldBe('Pelo menos 6 caracteres')
      })
    })
  })

  context('email no formato incorreto', () => {
    data.invemail.forEach((e) => {
      it(`Não deve cadastrar com o email: ${e}`, () => {
        cy.signup('Agatha França', e, 'pwd123')
        cy.alertShouldBe('Informe um email válido')
      });
    })
  })
})
