import { holidays } from "../../utils";

describe("Login as user with role employee", () => {
  const baseUrl = "http://localhost:8080/api/leavemanager/v1/";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOiJFTVBMT1lFRSIsInN1YiI6ImVzc291bmdvdS55YW5uaWNrMkBsZWF2ZW1hbmFnZXIuY29tIiwiaWF0IjoxNzA4NzY4MTMyLCJleHAiOjE3MDg3Njk1NzJ9.3xJeIxe7Bo28TRwZEUCnIljyLOkEckQKvfFgN3B3ebU";

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
        url: baseUrl + "holiday/all",
        method: "GET",
      },
      {
        statusCode: 200,
        body: holidays,
      },
    ).as("holidays");
    cy.intercept(
      {
        url: baseUrl + "holiday/2",
        method: "GET",
      },
      {
        statusCode: 200,
        body: holidays[1],
      },
    );

    cy.get("[data-test='Sign In']").last().click();
    cy.wait("@holidays");
    cy.get("[data-test='holiday-2']").click();
  });
});
