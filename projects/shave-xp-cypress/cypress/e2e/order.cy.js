import data from "../fixtures/order.json"
import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'
import catalogPage from '../support/pages/views/catalog'
import orderPage from '../support/pages/views/order'

describe('Pedido', () => {

  context('Usuário logado', () => {

    const { costumer, shaver, service } = data

    before(() => {
      const user = data.costumer

      cy.createUser(costumer)
      cy.apiLogin(costumer)

    })

    it('Deve poder solicitar serviços', () => {
      shaversPage.selectShaver(shaver.name)
      catalogPage.hasShaver(shaver.name)

      catalogPage.selectService(service.description)
      catalogPage.hasTitle(service.description)

      catalogPage.confirmOrder()
      orderPage.hasOrder()
    })

  })

})