describe('Blog app', function() {
  const USER_NAME = 'testuser';

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/testing/user', {
      user: USER_NAME
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Kirjaudu');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(USER_NAME);
      cy.get('#pwd').type(USER_NAME);
      cy.get('button:submit').click();

      cy.contains(`${USER_NAME} is logged in`);
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('incorrect');
      cy.get('#pwd').type(USER_NAME);
      cy.get('button:submit').click();

      cy.contains('Sisäänkirjautuminen epäonnistui');
    });
  });
});
