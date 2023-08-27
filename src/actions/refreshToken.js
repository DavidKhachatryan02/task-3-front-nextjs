"use server";

import { REST_API_URL } from "~/constants/enviroment";

export const refreshToken = async (data) => {
  const response = await fetch(`${REST_API_URL}/auth/refreshToken`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(data),
  });

  return await response.json();
};
