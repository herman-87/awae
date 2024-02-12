import { users } from "../../utils"

describe("Employees list", () => {
  it("should render correctly", () => {
    cy.visit("/");
    cy.get("[data-test='e-mailField']").last().type("wilfriedhanga5@gmail.com");
    cy.get("[data-test='passwordField']").last().type("@@DEUXmille2000");
    cy.intercept(
      {
        url: "http://localhost:8080/api/leavemanager/v1/admin/employee/all",
        method: "GET",
      },
      {
        statusCode: 200,
        body: users,
      },
    );
    cy.get("[data-test='Sign In']").last().click();
  });
});
