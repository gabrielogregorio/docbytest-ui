/// <reference types="cypress" />

describe('App', () => {
  context('Error', () => {
    it('should return 404 screen on access not exists page', () => {
      cy.visit('/');
      cy.get('h1:contains("Page Not Found - 404")').should('be.visible').should('exist');
      cy.get('h2:contains("You can try to access the /docs route, that\'s usually where we have the documentation")')
        .should('be.visible')
        .should('exist');

      cy.get('img[alt="not found image"]').should('exist').should('be.visible');
      cy.get('img[src="404 error lost in space-bro.svg"]').should('exist').should('be.visible');
      cy.get('a:contains("Online illustrations by Storyset")').should('exist').should('be.visible');
      cy.get('a[href="https://storyset.com/online"]').should('exist').should('be.visible');
    });

    it('should validate error on request docbytest', () => {
      cy.visit('/docs');
      cy.intercept('GET', 'http://127.0.0.1:3333/docs-json', { statusCode: 404 }).as('response');
      cy.wait('@response');

      cy.get('h1:contains("Error on fetch docs")').should('be.visible').should('exist');
      cy.get('h2:contains("Oops, there was a problem loading the documentation, sorry")')
        .should('be.visible')
        .should('exist');

      cy.get('img[alt="error image"]').should('exist').should('be.visible');
      cy.get('img[src="Computer troubleshooting-pana.svg"]').should('exist').should('be.visible');
      cy.get('a:contains("People illustrations by Storyset")').should('exist').should('be.visible');
      cy.get('a[href="https://storyset.com/people"]').should('exist').should('be.visible');
    });
  });

  context('Success', () => {
    it('should validate error on request docbytest', () => {
      cy.visit('/docs');
      cy.intercept('GET', '/docs-json', { fixture: 'docbytest' }).as('response');
      cy.wait('@response');

      cy.get('h1:contains("title h1")').should('exist').and('be.visible');
      cy.get('span:contains("documentation item")').should('be.visible').and('exist');
      cy.get('a[href="https://example.app/"]').should('exist').and('contain.text', 'url item').and('be.visible');

      cy.get('h2:contains("Second Title")').should('be.visible').should('exist');

      cy.get('th:contains("table-title")').should('exist').and('be.visible');
      cy.get('th:contains("table-description")').should('exist').and('be.visible');

      cy.get('td:contains("response-1")').should('exist').and('be.visible');
      cy.get('td:contains("response-2")').should('exist').and('be.visible');
      cy.get('td:contains("response-3")').should('exist').and('be.visible');
      cy.get('td:contains("response-4")').should('exist').and('be.visible');
    });

    it('should expand sidebar, valid content and hidden', () => {
      cy.visit('/docs');
      cy.intercept('GET', '/docs-json', { fixture: 'docbytest' }).as('response');
      cy.wait('@response');

      cy.get('h1:contains("title h1")').should('exist').and('be.visible');

      cy.get('input[placeholder="Pesquise endpoints, textos..."]').should('not.be.visible');
      cy.get('button[id="expand-menu"]').click();
      cy.get('input[placeholder="Pesquise endpoints, textos..."]').should('exist').and('be.visible');

      cy.get('h3[id="title-item-menu"]:contains("Title Docs 1")').should('be.visible');
      cy.get('h3[id="title-item-menu"]:contains("Title Docs 2")').should('be.visible');
      cy.get('h3[id="title-item-menu"]:contains("🔐 Autenticação")').should('be.visible');
      cy.get('h3[id="title-item-menu"]:contains("👤 Usuários")').should('be.visible');

      cy.get('h4[id="sub-item-menu"]:contains("Api Example Item 1")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("Api Example Item 2")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("Api Example Item 3")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("Api Example Item 4")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("realiza login e obtém um token jwt")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("realiza login e obtém um token jwt")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("deletar a própria conta")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("Cadastrar um usuário")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("Obter a si mesmo")').should('be.visible');
      cy.get('h4[id="sub-item-menu"]:contains("atualiza dados de si mesmo")').should('be.visible');

      cy.get('button[id="expand-menu"]').click();
      cy.get('input[placeholder="Pesquise endpoints, textos..."]').should('not.be.visible');
    });

    it('should toggle in docs using sidebar, and hidden on click', () => {
      cy.visit('/docs');
      cy.intercept('GET', '/docs-json', { fixture: 'docbytest' }).as('response');
      cy.wait('@response');

      cy.get('h1:contains("title h1")').should('exist').and('be.visible');

      cy.get('button[id="expand-menu"]').click();

      cy.get('h4:contains("Api Example Item 2")').click();
      cy.get('input[placeholder="Pesquise endpoints, textos..."]').should('not.be.visible');

      cy.get('h1:contains("Title second")').should('be.visible');
    });
  });
});
