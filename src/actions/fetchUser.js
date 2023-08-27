"use server";

import { COOKIE_TOKEN_KEY } from "~/constants/config";
import { getCookie } from "./cookie-actions";
import { apiClient } from "~/services/client";

export const fetchUser = async () => {
  const accessToken = await getCookie(COOKIE_TOKEN_KEY);

  if (!accessToken) {
    throw new Error("Access token not defined");
  }

  const { data } = await apiClient.get("/auth/getMe", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
