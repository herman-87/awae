/// <reference types="cypress" />
import { configs, holidays, holidaysTypes, users } from "./index";

export enum ROLE {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  SUPER_ADMIN = "super_admin",
}

export const utilsMocks = () => {
  const baseUrl = "http://localhost:8080/api/leavemanager/v1/";

  const stubLogin = () => {
    cy.visit("/");
    cy.get("[data-test='emailField']").last().type("wilfriedhanga5@gmail.com");
    cy.get("[data-test='passwordField']").last().type("@@DEUXmille2000");
    cy.get("[data-test='Sign In']").last().click();
  };

  const stubAccessToken = (role: ROLE = ROLE.EMPLOYEE) => {
    let token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOiJFTVBMT1lFRSIsInN1YiI6ImVzc291bmdvdS55YW5uaWNrMkBsZWF2ZW1hbmFnZXIuY29tIiwiaWF0IjoxNzA4NzY4MTMyLCJleHAiOjE3MDg3Njk1NzJ9.3xJeIxe7Bo28TRwZEUCnIljyLOkEckQKvfFgN3B3ebU";
    if (role === ROLE.ADMIN) {
      token =
        "eyJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOiJBRE1JTiIsInN1YiI6ImVzc291bmdvdS55YW5uaWNrMUBsZWF2ZW1hbmFnZXIuY29tIiwiaWF0IjoxNzA4NzY4MDI2LCJleHAiOjE3MDg3Njk0NjZ9.L-DOlvB2BnpRNK1rETq41gBmK1b2hgz3duxI2NGxPdg";
    }
    if (role === ROLE.SUPER_ADMIN) {
      token =
        "eyJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOiJTVVBFUl9BRE1JTiIsInN1YiI6InN1cGVyX2FkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwODc3MTY4OSwiZXhwIjoxNzA4NzczMTI5fQ.tCAE4OzfDcotE3GRsOQ7YJ9bqCWrZ9iRqeT_LMyHEyc";
    }

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
  };

  const stubEmployeeList = () => {
    cy.intercept(
      {
        url: baseUrl + "admin/employee/all",
        method: "GET",
      },
      {
        statusCode: 200,
        body: users,
      },
    ).as("employeesList");
  };

  const stubAdminAdd = () => {
    cy.intercept(
      {
        url: baseUrl + "admin/add",
        method: "POST",
      },
      {
        statusCode: 204,
      },
    ).as("addAdmin");
  };

  const stubEmployeeAdd = () => {
    cy.intercept(
      {
        url: baseUrl + "admin/employee/add",
        method: "POST",
      },
      {
        statusCode: 204,
      },
    ).as("createEmployee");
  };

  const stubEmployeeEdit = () => {
    cy.intercept(
      {
        url: baseUrl + "employee/1",
        method: "PUT",
      },
      {
        statusCode: 204,
      },
    ).as("editEmployee");
  };

  const stubEmployeeDetails = () => {
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
  };

  const fillEmployeeData = (role: ROLE = ROLE.ADMIN) => {
    cy.get("[data-test='+ Add']").should("be.visible").click();
    cy.get("[data-test='last nameField']").type("Hanga Lagoue");
    cy.get("[data-test='first nameField']").type("Wilfried Junior");
    cy.get("[data-test='date of birthField']").type("27/05/2000");
    if (role === ROLE.SUPER_ADMIN) {
      cy.get("[data-test='Set as admin']").click();
    }
    cy.get("[data-test='Save']").click();
    cy.get("[data-test='user-1']").should("be.visible").click();
    cy.get("[data-test='Edit']").click();
    cy.get("[data-test='first nameField']").type("Wilfried Junior");
    cy.get("[data-test='Save']").click();
  };

  const stubHolidayDetails = () => {
    holidays.slice(2).forEach((holiday) => {
      cy.intercept(
        {
          url: baseUrl + `holiday/${holiday.id}`,
          method: "GET",
        },
        {
          statusCode: 200,
          body: holiday,
        },
      ).as(`holidayDetails::${holiday.id}`);
    });
  };

  const stubAllHolidaysList = () => {
    cy.intercept(
      {
        url: baseUrl + "holiday/all",
        method: "GET",
      },
      {
        statusCode: 200,
        body: holidays,
      },
    ).as("allHolidaysList");
  };

  const stubMyHolidays = () => {
    cy.intercept(
      {
        url: baseUrl + "my-holiday",
        method: "GET",
      },
      {
        statusCode: 200,
        body: holidays.slice(2),
      },
    ).as("myHolidays");
  };

  const stubHolidaysTypes = () => {
    cy.intercept(
      {
        url: baseUrl + "holiday/type",
        method: "GET",
      },
      {
        statusCode: 200,
        body: holidaysTypes,
      },
    );
  };

  const stubHolidayTypeById = () => {
    cy.intercept(
      {
        url: baseUrl + "holiday/type/1",
        method: "GET",
      },
      {
        statusCode: 200,
        body: holidaysTypes[0],
      },
    );
  };

  const stubConfigsByHolidayTypeById = () => {
    cy.intercept(
      {
        url: baseUrl + "config/holiday/1",
        method: "GET",
      },
      {
        statusCode: 200,
        body: configs,
      },
    );
  };

  return {
    stubLogin,
    stubMyHolidays,
    stubAccessToken,
    stubEmployeeAdd,
    stubEmployeeList,
    stubEmployeeEdit,
    stubHolidayDetails,
    stubAllHolidaysList,
    stubEmployeeDetails,
    stubHolidaysTypes,
    fillEmployeeData,
    stubAdminAdd,
    stubConfigsByHolidayTypeById,
    stubHolidayTypeById,
  };
};
