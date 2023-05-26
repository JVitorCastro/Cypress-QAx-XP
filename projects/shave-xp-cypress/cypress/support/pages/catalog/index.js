class CatalogPage {

  selectService(name) {
    cy.contains('.catalog-item h3', name)
      .should('be.visible')
      .click()
  }

  confirmOrder() {
    cy.get('.swal2-confirm').click()
  }

}

export default new CatalogPage()