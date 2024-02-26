import type { ReasonDTO } from "@/services/awae";

export class Reason {
  isNull: boolean;
  constructor(private reason: ReasonDTO) {
    this.isNull = false;
  }

  get why(): string {
    return this.reason.value || "";
  }

  set why(why: string) {
    this.reason.value = why;
  }
}

export const NullableReason = (): Reason => {
  const reason = new Reason({});
  reason.isNull = true;
  return reason;
};
