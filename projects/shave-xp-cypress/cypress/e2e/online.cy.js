describe('app', () => {
  it('deve estar online', () => {
    cy.visit('localhost:3000')
  })
})