import type { EmployeeDTO } from "@/services/awae";
import { TABLE_ROW } from "@/utils/enum";

export class User {
  isNull: boolean;

  constructor(private user: EmployeeDTO) {
    this.isNull = false;
  }

  toString(data: unknown): string {
    return data?.toString() || "";
  }

  get id(): string {
    return this.toString(this.user.id);
  }

  get email(): string {
    return this.toString(this.user.email);
  }

  get firstname(): string {
    return this.toString(this.user.firstname);
  }

  get lastname(): string {
    return this.toString(this.user.lastname);
  }

  get dateOfBirth(): string {
    return this.toString(this.user.dateOfBirth);
  }

  getTextFor(label: TABLE_ROW): string {
    switch (label) {
      case TABLE_ROW.EMAIL:
        return this.email;
      case TABLE_ROW.FIRST_NAME:
        return this.firstname;
      case TABLE_ROW.LAST_NAME:
        return this.lastname;
      case TABLE_ROW.DATE_OF_BIRTH:
        return this.dateOfBirth;
      default:
        return "-";
    }
  }
}

export const NullableUser = (): User => {
  const user = new User({});
  user.isNull = true;
  return user;
};
