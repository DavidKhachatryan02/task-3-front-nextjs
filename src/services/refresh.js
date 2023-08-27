"use server";

import { getCookie, setCookie } from "~/actions/cookie-actions";
import { COOKIES_REFRESH_KEY, COOKIE_TOKEN_KEY } from "~/constants/config";
import { apiClient } from "./client";

export const refreshToken = async () => {
  const refToken = await getCookie(COOKIES_REFRESH_KEY);
  const accessToken = await getCookie(COOKIE_TOKEN_KEY);

  if (!refToken || !accessToken) throw new Error("Invalid data");

  const payload = { refreshToken: refToken, accessToken };

  const { data } = await apiClient.post("/auth/refreshToken", payload, {
    cache: "no-store",
  });

  return data;
};
