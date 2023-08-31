"use server";

import { apiClient } from "~/services/client";

export const loginUser = async (body) => {
  const { data } = await apiClient.post("/auth/login", body, {
    cache: "no-store",
  });

  return data;
};
