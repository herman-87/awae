import { OpenAPI as awaeOpenApi } from "@/services/awae";

export const prepareApis = () => {
  awaeOpenApi.HEADERS = customHeaders;
  awaeOpenApi.TOKEN = getAccessToken;
  awaeOpenApi.BASE = import.meta.env.VITE_REST_API_BASE_URL;
};

const getAccessToken = async (): Promise<string> => {
  const accessToken: string = localStorage.getItem("apiAccessToken") as string;

  return accessToken === null ? "" : accessToken;
};

export const customHeaders = async (): Promise<Record<string, string>> => {
  const accessToken: string = localStorage.getItem("apiAccessToken") as string;

  return {
    Authorization: `Bearer ${accessToken === null ? "" : accessToken}`,
    "tenant-id": localStorage.getItem("tenant-id") as string,
  };
};
