import { utilsMocks } from "../../utils/stubs";

const {
  stubLogin,
  stubAccessToken,
  stubMyHolidays,
  stubAllHolidaysList,
  stubHolidayDetails,
} = utilsMocks();

describe("Login as user with role employee", () => {
  it("should render correctly", () => {
    stubAccessToken();
    stubMyHolidays();
    stubAllHolidaysList();
    stubLogin();
    cy.wait("@allHolidaysList");
    cy.get("[data-test='Private']").click();
    cy.wait("@myHolidays");
    stubHolidayDetails();
    cy.get("[data-test='holiday-3']").click();
    cy.get("[data-test='closeModalBtn']").click();
    cy.get("[data-test='holiday-4']").click();
    cy.get("[data-test='closeModalBtn']").click();
    cy.get("[data-test='holiday-5']").click();
    cy.get("[data-test='closeModalBtn']").click();
    cy.get("[data-test='holiday-6']").click();
  });
});
