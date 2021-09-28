import { v4 as uuidv4 } from 'uuid';

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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(USER_NAME);
      cy.get('#pwd').type(USER_NAME);
      cy.get('button:submit').click();

      cy.contains(`${ USER_NAME } is logged in`);
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('incorrect');
      cy.get('#pwd').type(USER_NAME);
      cy.get('button:submit').click();

      cy.contains('Sisäänkirjautuminen epäonnistui');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/login', {
        user: USER_NAME,
        password: USER_NAME
      }).then(response => {
        localStorage.setItem('user', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function() {

      const blog = {
        title: uuidv4(),
        author: uuidv4(),
        url: uuidv4()
      };
      cy.get('#first').click();

      cy.get('#title_text').type(blog.title);
      cy.get('#author_text').type(blog.author);
      cy.get('#url_text').type(blog.url);
      cy.get('#create_blog').click();

      cy.contains('Blogi lisätty onnistuneesti');
      cy.contains(blog.title);
      cy.contains(blog.author);
      cy.contains(blog.url);
    });
  });
});
