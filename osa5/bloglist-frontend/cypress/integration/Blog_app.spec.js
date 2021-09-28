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

    describe('When blog has been created', () => {

      let blog = null;
      beforeEach(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        blog = {
          title: uuidv4(),
          author: uuidv4(),
          url: uuidv4(),
          likes: 0,
          user: user.name
        };

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: blog,
          auth: {
            bearer: user.token
          }
        }).then(response => {
          blog.id = response.body.id;
        });
        cy.visit('http://localhost:3000');

      });

      it('Blog can be liked', () => {
        cy.get(`#${ blog.id }`).as('theBlog');
        cy.get('@theBlog').find('#toggle').click();
        cy.get('@theBlog').find('#likes').find('button').click();
        cy.get('@theBlog', { timeout: 500 }).contains('Likes 1');
      });

      it('Blog can be deleted', () => {
        cy.get(`#${ blog.id }`).as('theBlog');
        cy.get('@theBlog').find('#toggle').click();
        cy.get('@theBlog').find('#deletion').find('button').click();
        cy.get('@theBlog').should('not.exist');
      });
    });

    describe('Blogs are ordered correctly', () => {

      beforeEach(() => {

        const user = JSON.parse(localStorage.getItem('user'));

        [...Array(5).keys()].map(i => {
          const blog = {
            title: uuidv4(),
            author: i,
            url: uuidv4(),
            likes: Math.floor(Math.random() * 1000),
            user: uuidv4()
          };

          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs',
            body: blog,
            auth: {
              bearer: user.token
            }
          });

          cy.request({
            method: 'GET',
            url: 'http://localhost:3003/api/blogs',
            auth: {
              bearer: user.token
            }
          });
        });
      }
      );

      it('Blogs are based on likes',  () => {
        let likes = -1;

        cy.visit('http://localhost:3000');

        cy.get('.blog_like').each(blogLike => {
          const likeCount = parseInt(blogLike.get(0).innerText);
          if (likes === -1) {
            likes = likeCount;
          } else {
            if (likeCount > likes) {
              throw new Error('test fails here');
            }
            likes = likeCount;
          }
        });
      });
    });

  });
});
