import { defineStore } from "pinia";
import { HolidayConfigService, HolidayService } from "@/services/awae";
import {
  HolidayConfig,
  HolidayType,
  NullableHolidayConfig,
  NullableHolidayType,
} from "@/domain/config";

export const useHolidayConfigStore = defineStore("config", () => {
  const activeConfig = async (holidayConfigId: number): Promise<void> => {
    try {
      await HolidayConfigService.activateHolidayConfig({ holidayConfigId });
    } catch (error) {
      console.log(error);
    }
  };

  const createConfig = async (config: HolidayConfig): Promise<void> => {
    try {
      await HolidayConfigService.createHolidayConfig({
        requestBody: config.DTO,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllConfigs = async (): Promise<HolidayConfig[]> => {
    let configs: HolidayConfig[] = [];
    try {
      const responses = await HolidayConfigService.getAllHolidayConfigs();
      configs = responses.map((response) => new HolidayConfig(response));
    } catch (error) {
      console.log(error);
    }
    return configs;
  };

  const getAllConfigsByHolidayType = async (
    holidayTypeId: number,
  ): Promise<HolidayConfig[]> => {
    let configs: HolidayConfig[] = [];
    try {
      const responses =
        await HolidayConfigService.getAllHolidayConfigByHolidayType({
          holidayTypeId,
        });
      configs = responses.map((response) => new HolidayConfig(response));
    } catch (error) {
      console.log(error);
    }
    return configs;
  };

  const getConfigById = async (
    holidayConfigId: number,
  ): Promise<HolidayConfig> => {
    let config = NullableHolidayConfig();
    try {
      const response = await HolidayConfigService.getHolidayConfigById({
        holidayConfigId,
      });
      config = new HolidayConfig(response);
    } catch (error) {
      console.log(error);
    }
    return config;
  };

  const deactivateConfig = async (holidayConfigId: number): Promise<void> => {
    try {
      await HolidayConfigService.deactivateHolidayConfig({
        holidayConfigId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllHolidaysTypes = async (): Promise<HolidayType[]> => {
    let types: HolidayType[] = [];
    try {
      const responses = await HolidayService.getAllHolidayTypes();
      types = responses.map((response) => new HolidayType(response));
    } catch (error) {
      console.log(error);
    }
    return types;
  };

  const getHolidayTypeById = async (
    holidayTypeId: number,
  ): Promise<HolidayType> => {
    let type: HolidayType = NullableHolidayType();
    try {
      const response = await HolidayService.getHolidayTypeById({
        holidayTypeId,
      });
      type = new HolidayType(response);
    } catch (error) {
      console.log(error);
    }
    return type;
  };

  const createHolidayType = async (holidayType: HolidayType): Promise<void> => {
    try {
      await HolidayService.createHolidayType({
        requestBody: holidayType.DTO,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createConfig,
    getAllConfigs,
    getConfigById,
    activeConfig,
    deactivateConfig,
    createHolidayType,
    getHolidayTypeById,
    getAllHolidaysTypes,
    getAllConfigsByHolidayType,
  };
});
