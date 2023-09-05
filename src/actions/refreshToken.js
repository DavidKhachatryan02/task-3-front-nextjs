"use client";

import { COOKIES_TOKEN_KEY, COOKIES_REFRESH_KEY } from "~/constants/config";
import { useApiClient } from "~/hooks/useClient";
import { getCookie, setCookie } from "~/actions/cookie-actions";

export const RefreshToken = async () => {
  const { post } = useApiClient();

  const refToken = await getCookie(COOKIES_REFRESH_KEY);
  const accessToken = await getCookie(COOKIES_TOKEN_KEY);

  console.log("OLD ACCESS TOKEN :", accessToken);

  if (!refToken || !accessToken) throw new Error("Invalid data");

  const payload = { refreshToken: refToken, accessToken };

  const { data } = await post("/auth/refreshToken", payload, {
    cache: "no-store",
  });

  await setCookie(data.accessToken); //!not WORKING WTFFFFFFFFFFFff
  console.log("new ACCESS TOKEN :", await getCookie(COOKIES_TOKEN_KEY));

  return data;
};
