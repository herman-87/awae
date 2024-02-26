import { ROLE, utilsMocks } from "../../utils/stubs";

const {
  stubLogin,
  stubAccessToken,
  stubEmployeeAdd,
  stubEmployeeEdit,
  stubEmployeeList,
  fillEmployeeData,
  stubEmployeeDetails,
} = utilsMocks();

describe("Login as user with role admin", () => {
  it("should render correctly", () => {
    stubAccessToken(ROLE.ADMIN);
    stubLogin();
    stubEmployeeList();
    stubEmployeeAdd();
    stubEmployeeEdit();
    stubEmployeeDetails();
    fillEmployeeData();
  });
});
