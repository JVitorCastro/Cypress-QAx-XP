import data from "../fixtures/order.json"
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import catalogPage from '../support/pages/catalog'

describe('Pedido', () => {

  context('Usuário logado', () => {

    const { costumer, shaver, service } = data

    before(() => {
      const user = data.costumer

      cy.createUser(costumer)

      loginPage.submit(costumer.email, costumer.password)
      shaversPage.header.userShouldBeLoggedIn(costumer.name)
    })

    it('Deve poder solicitar serviços', () => {
      shaversPage.selectShaver(shaver.name)
      catalogPage.selectService(service.description)
      catalogPage.confirmOrder()
    })

  })

})