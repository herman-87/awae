import { users } from "../../utils";

describe("Login as user with role super-admin", () => {
  const baseUrl = "http://localhost:8080/api/leavemanager/v1/";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOiJTVVBFUl9BRE1JTiIsInN1YiI6InN1cGVyX2FkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwODc3MTY4OSwiZXhwIjoxNzA4NzczMTI5fQ.tCAE4OzfDcotE3GRsOQ7YJ9bqCWrZ9iRqeT_LMyHEyc";

  it("should render correctly", () => {
    cy.visit("/");
    cy.get("[data-test='emailField']").last().type("wilfriedhanga5@gmail.com");
    cy.get("[data-test='passwordField']").last().type("@@DEUXmille2000");

    cy.intercept(
      {
        url: baseUrl + "auth/authenticate",
        method: "POST",
      },
      {
        statusCode: 201,
        body: {
          value: token,
        },
      },
    );

    cy.intercept(
      {
        url: baseUrl + "admin/employee/all",
        method: "GET",
      },
      {
        statusCode: 200,
        body: users,
      },
    );

    cy.intercept(
      {
        url: baseUrl + "employee/1",
        method: "GET",
      },
      {
        statusCode: 200,
        body: users[0],
      },
    );

    cy.intercept(
      {
        url: baseUrl + "admin/add",
        method: "POST",
      },
      {
        statusCode: 204,
      },
    );

    cy.intercept(
      {
        url: baseUrl + "employee/1",
        method: "PUT",
      },
      {
        statusCode: 204,
      },
    );

    cy.get("[data-test='Sign In']").last().click();
    cy.get("[data-test='+ Add']").should("be.visible").click();
    cy.get("[data-test='last nameField']").type("Hanga Lagoue");
    cy.get("[data-test='first nameField']").type("Wilfried Junior");
    cy.get("[data-test='date of birthField']").type("27/05/2000");
    cy.get("[data-test='Set as admin']").click();
    cy.get("[data-test='Save']").click();
    cy.get("[data-test='user-1']").should("be.visible").click();
    cy.get("[data-test='Edit']").click();
    cy.get("[data-test='first nameField']").type("Wilfried Junior");
    cy.get("[data-test='Save']").click();
  });
});
