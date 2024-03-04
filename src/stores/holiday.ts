import { defineStore } from "pinia";
import { Holiday, NullableHoliday } from "@/domain/holiday";
import { HolidayService } from "@/services/awae";
import type { Reason } from "@/domain/reason";

export const useHolidayStore = defineStore("holiday", () => {
  const getAllHolidays = async (): Promise<Holiday[]> => {
    try {
      const holidays = await HolidayService.getAllHolidays();
      return holidays.map((holiday) => new Holiday(holiday));
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getMyHolidays = async (): Promise<Holiday[]> => {
    try {
      const holidays = await HolidayService.getAllMyHolidays();
      return holidays.map((holiday) => new Holiday(holiday));
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getHolidayById = async (holidayId: number): Promise<Holiday> => {
    try {
      const holiday = await HolidayService.getHolidayById({ holidayId });
      return new Holiday(holiday);
    } catch (error) {
      console.log(error);
      return NullableHoliday();
    }
  };

  const publishHoliday = async (holidayId: number): Promise<void> => {
    try {
      await HolidayService.publishHoliday({ holidayId });
    } catch (error) {
      console.log(error);
    }
  };

  const draftHoliday = async (holidayId: number): Promise<void> => {
    try {
      await HolidayService.unpublishedHoliday({ holidayId });
    } catch (error) {
      console.log(error);
    }
  };

  const validateHoliday = async ({
    holidayId,
    reason,
  }: {
    holidayId: number;
    reason?: Reason;
  }): Promise<void> => {
    try {
      await HolidayService.approvedHoliday({
        holidayId,
        requestBody: {
          value: reason?.why,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectHoliday = async ({
    holidayId,
    reason,
  }: {
    holidayId: number;
    reason?: Reason;
  }): Promise<void> => {
    try {
      await HolidayService.rejectHoliday({
        holidayId,
        requestBody: {
          value: reason?.why,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    draftHoliday,
    rejectHoliday,
    getMyHolidays,
    getHolidayById,
    getAllHolidays,
    publishHoliday,
    validateHoliday,
  };
});
