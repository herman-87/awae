import { ROLE } from "@/utils/enum";
import { jwtDecode } from "jwt-decode";
import type { TokenDTO } from "@/services/awae";

export class Token {
  isLoggedIn: boolean;
  private readonly decode: Payload;
  constructor(private token: TokenDTO) {
    this.decode = jwtDecode<Payload>(this.token.value || "");
    this.isLoggedIn = true;
  }

  get accessToken(): string {
    return this.token.value || "";
  }

  get role(): ROLE {
    return ROLE[this.decode.Scopes.toUpperCase() as keyof typeof ROLE];
  }

  get isAdmin(): boolean {
    return this.role === ROLE.ADMIN;
  }

  get isSuperAdmin(): boolean {
    return this.role === ROLE.SUPER_ADMIN;
  }

  get isEmployee(): boolean {
    return this.role === ROLE.EMPLOYEE;
  }

  hasRoleToAccess(roles: string[] | undefined): boolean {
    if (roles) {
      return roles.includes(this.role);
    }
    return true;
  }
}

export type Payload = { sub: string; iat: number; exp: number; Scopes: string };
