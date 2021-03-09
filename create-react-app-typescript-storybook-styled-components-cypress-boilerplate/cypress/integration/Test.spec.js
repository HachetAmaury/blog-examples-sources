// ./cypress/integration/Test.spec.js

/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should have the .App container", () => {
    cy.get(".App").should("exist");
  });

  it("Should have the link", () => {
    cy.get("a.App-link").should("exist");
  });

  it("Should have the correct url in the link", () => {
    cy.get("a.App-link")
      .should("have.attr", "href")
      .should("equal", "https://reactjs.org");
  });
});
