import type { HolidayConfigDTO, HolidayTypeDTO } from "@/services/awae";

export class HolidayConfig {
  isNull: boolean;

  constructor(private config: HolidayConfigDTO) {
    this.isNull = false;
  }

  get id(): number | undefined {
    return this.config.id;
  }

  get holidayTypeId(): number | undefined {
    return this.config.holidayTypeId;
  }

  set holidayTypeId(id: number) {
    this.config.holidayTypeId = id;
  }

  get description(): string | undefined {
    return this.config.description;
  }

  set description(description: string) {
    this.config.description = description;
  }

  get numberOfTime(): number | undefined {
    return this.config.numberOfTime;
  }

  set numberOfTime(time: number) {
    this.config.numberOfTime = time;
  }

  get minimumOfDays(): number | undefined {
    return this.config.minimumOfDays;
  }

  set minimumOfDays(days: number) {
    this.config.minimumOfDays = days;
  }

  get maximumOfDays(): number | undefined {
    return this.config.maximumOfDays;
  }

  set maximumOfDays(days: number) {
    this.config.maximumOfDays = days;
  }

  get status(): CONFIG_STATUS {
    if (this.config.status) {
      return CONFIG_STATUS[this.config.status as keyof typeof CONFIG_STATUS];
    }
    return CONFIG_STATUS.DRAFT;
  }

  get isDraft(): boolean {
    return this.status === CONFIG_STATUS.DRAFT;
  }

  get isApplied(): boolean {
    return this.status === CONFIG_STATUS.APPLY;
  }

  get isClosed(): boolean {
    return this.status === CONFIG_STATUS.CLOSED;
  }

  get DTO(): HolidayConfigDTO {
    return this.config;
  }
}

export class HolidayType {
  isNull: boolean;

  constructor(private type: HolidayTypeDTO) {
    this.isNull = false;
  }

  getStringFrom(data?: string | number): string {
    return data?.toString() || "";
  }

  get id(): string {
    return this.getStringFrom(this.type.id);
  }

  get name(): string {
    return this.getStringFrom(this.type.name);
  }

  get description(): string {
    return this.getStringFrom(this.type.description);
  }

  get DTO(): HolidayTypeDTO {
    return this.type;
  }
}

export const NullableHolidayType = (): HolidayType => {
  const type = new HolidayType({});
  type.isNull = true;
  return type;
};

export const NullableHolidayConfig = (): HolidayConfig => {
  const config = new HolidayConfig({});
  config.isNull = true;
  return config;
};

enum CONFIG_STATUS {
  DRAFT = "DRAFT",
  APPLY = "APPLY",
  CLOSED = "CLOSED",
}
