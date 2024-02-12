import { defineStore } from "pinia";
import { AdminService, EmployeeService } from "@/services/awae";
import { NullableUser, User } from "@/domain/user";

export const useUserStore = defineStore("user", () => {
  const createAdmin = async (user: User): Promise<number | undefined> => {
    try {
      return AdminService.createAdmin({
        requestBody: {
          dateOfBirth: user.dateOfBirth,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const createEmployee = async (user: User): Promise<number | undefined> => {
    try {
      return AdminService.createEmployee({
        requestBody: {
          dateOfBirth: user.dateOfBirth,
          lastname: user.lastname,
          firstname: user.firstname,
        },
      });
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
  const getAllEmployees = async (): Promise<User[]> => {
    try {
      const list = await AdminService.getAllEmployees();
      return list.map((dto) => new User(dto));
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getEmployeeById = async (employeeId: number): Promise<User> => {
    try {
      const dto = await EmployeeService.getEmployeeById({
        employeeId,
      });
      return new User(dto);
    } catch (error) {
      console.log(error);
    }
    return NullableUser();
  };

  const updateEmployee = async (user: User): Promise<number | undefined> => {
    try {
      return EmployeeService.updateEmployee({
        employeeId: +user.id,
        requestBody: {
          dateOfBirth: user.dateOfBirth,
          lastname: user.lastname,
          firstname: user.firstname,
        },
      });
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const deleteEmployee = async (employeeId: string): Promise<void> => {
    try {
      await EmployeeService.deleteEmployeeById({
        employeeId: +employeeId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createAdmin,
    deleteEmployee,
    createEmployee,
    updateEmployee,
    getAllEmployees,
    getEmployeeById,
  };
});
