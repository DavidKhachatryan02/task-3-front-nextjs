"use client";

import { COOKIES_TOKEN_KEY, COOKIES_REFRESH_KEY } from "~/constants/config";
import { useApiClient } from "~/hooks/useClient";
import { getCookie, setCookie } from "~/actions/cookie-actions";

export const RefreshToken = async () => {
  const { post } = useApiClient();

  const refToken = await getCookie(COOKIES_REFRESH_KEY);
  const accessToken = await getCookie(COOKIES_TOKEN_KEY);

  if (!refToken || !accessToken) throw new Error("Invalid data");

  const payload = { refreshToken: refToken, accessToken };

  const { data } = await post("/auth/refreshToken", payload, {
    cache: "no-store",
  });

  await setCookie(COOKIES_TOKEN_KEY, data.accessToken); //!not WORKING WTFFFFFFFFFFFff

  return data;
};
