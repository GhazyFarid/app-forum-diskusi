/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Input Email"]').should('be.visible');
    cy.get('input[placeholder="Input Password"]').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
  });

  it('should display error when email is empty', () => {
    cy.contains('button', 'Login').click();

    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain.text', '"email" is not allowed to be empty');
  });

  it('should display error when password is empty', () => {
    cy.get('input[placeholder="Input Email"]').type('budi@yopmail.com');
    cy.contains('button', 'Login').click();

    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain.text', '"password" is not allowed to be empty');
  });

  it('should display error when email and password are wrong', () => {
    cy.get('input[placeholder="Input Email"]').type('testuser@gmail.com');
    cy.get('input[placeholder="Input Password"]').type('wrong_password');
    cy.contains('button', 'Login').click();

    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain.text', 'email or password is wrong');
  });

  it('should display threads when email and password are correct', () => {
    cy.get('input[placeholder="Input Email"]').type('budi@yopmail.com');
    cy.get('input[placeholder="Input Password"]').type('P@ssvv0rd');
    cy.contains('button', 'Login').click();

    // cek bahwa TopBar menampilkan Logout
    cy.contains('button', 'Logout').should('be.visible');

    // cek bahwa Threads page tampil
    cy.contains('h2', 'Diskusi Tersedia').should('be.visible');
  });
});
