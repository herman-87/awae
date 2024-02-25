import { defineStore } from "pinia";
import { Holiday, NullableHoliday } from "@/domain/holiday";
import { HolidayService } from "@/services/awae";

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

  const getHolidayById = async (holidayId: number): Promise<Holiday> => {
    try {
      const holiday = await HolidayService.getHolidayById({ holidayId });
      return new Holiday(holiday);
    } catch (error) {
      console.log(error);
      return NullableHoliday();
    }
  };

  return {
    getAllHolidays,
    getHolidayById,
  };
});
