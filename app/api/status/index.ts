"use client";

import { axiosInstance } from "@/app/api";

export const getApiStatus = async () => {
  try {
    const { data } = await axiosInstance.get("/Api/Status");

    return data;
  } catch (error) {
    console.error(error);

    return {
      apiStatus: "Failed",
      databaseConnectionStatus: "Failed",
    };
  }
};
