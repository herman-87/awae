import { ROLE, utilsMocks } from "../../utils/stubs";

const {
  stubLogin,
  stubAccessToken,
  stubAdminAdd,
  stubEmployeeEdit,
  stubEmployeeList,
  fillEmployeeData,
  stubEmployeeDetails,
  stubHolidaysTypes,
  stubConfigsByHolidayTypeById,
  stubHolidayTypeById,
} = utilsMocks();

describe("Login as user with role super-admin", () => {
  it("should render correctly", () => {
    stubAccessToken(ROLE.SUPER_ADMIN);
    stubLogin();
    stubEmployeeList();
    stubAdminAdd();
    stubEmployeeEdit();
    stubEmployeeDetails();
    fillEmployeeData(ROLE.SUPER_ADMIN);
    stubHolidaysTypes();
    stubConfigsByHolidayTypeById();
    stubHolidayTypeById();
    cy.get("[data-test='Settings']").click();
    cy.get("[data-test='holidayType-1']").click();
  });
});
