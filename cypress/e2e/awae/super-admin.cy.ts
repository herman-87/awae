import { ROLE, utilsMocks } from "../../utils/stubs";

const {
  stubLogin,
  stubAccessToken,
  stubAdminAdd,
  stubEmployeeEdit,
  stubEmployeeList,
  fillEmployeeData,
  stubEmployeeDetails,
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
  });
});
