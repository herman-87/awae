import { OpenAPI as awaeOpenApi } from "@/services/awae";

export const prepareApis = () => {
  awaeOpenApi.HEADERS = customHeaders;
  awaeOpenApi.TOKEN = getPublicAccessToken;
  awaeOpenApi.BASE = import.meta.env.VITE_REST_API_BASE_URL;
};

const getPublicAccessToken = async (): Promise<string> => {
  const publicAccessToken: string = localStorage.getItem(
    "apiAccessToken",
  ) as string;

  return publicAccessToken === null ? "" : publicAccessToken;
};

export const customHeaders = async (): Promise<Record<string, string>> => {
  const publicAccessToken: string = localStorage.getItem(
    "apiAccessToken",
  ) as string;

  return {
    Authorization: `Bearer ${publicAccessToken === null ? "" : publicAccessToken}`,
    "tenant-id": localStorage.getItem("tenant-id") as string,
  };
};
