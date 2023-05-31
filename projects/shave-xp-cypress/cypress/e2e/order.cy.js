import data from "../fixtures/order.json"

describe('Pedido', () => {

  context('Usuário logado', () => {

    const { costumer, shaver, service } = data

    before(() => {
      const user = data.costumer

      cy.createUser(costumer)
      cy.apiLogin(costumer)

    })

    it('Deve poder solicitar serviços', () => {
      cy.selectShaver(shaver.name)
      cy.selectService(service.description)
      cy.confirmOrder()
      cy.hasOrder()
    })

  })

})