import { ROLE } from "@/utils/enum";
import { jwtDecode } from "jwt-decode";
import type { TokenDTO } from "@/services/awae";

export class Token {
  isNull: boolean;
  constructor(private token: TokenDTO) {
    this.isNull = false;
  }

  get decode(): Payload {
    const token = localStorage.getItem("apiAccessToken") || "";
    return jwtDecode<Payload>(this.token.value || token);
  }

  get accessToken(): string {
    return this.token.value || "";
  }

  set accessToken(token: string) {
    this.token.value = token;
  }

  get isLoggedIn(): boolean {
    return !this.isNull || !!localStorage.getItem("apiAccessToken");
  }

  get role(): ROLE {
    return ROLE[this.decode.scopes.toUpperCase() as keyof typeof ROLE];
  }

  get hasAccess(): boolean {
    return this.isAdmin || this.isSuperAdmin;
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

  get email(): string {
    return this.decode.sub;
  }

  get avatar(): string {
    const word = this.email.split("@")[0].split("");
    return `${word[0]}${word.pop()}`.toUpperCase();
  }
}

export type Payload = { sub: string; iat: number; exp: number; scopes: string };

export const NullableToken = (): Token => {
  const token = new Token({});
  token.isNull = true;
  return token;
};
