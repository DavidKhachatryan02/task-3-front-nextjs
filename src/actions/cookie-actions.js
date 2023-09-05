"use server";

import { cookies } from "next/headers";

export const setCookie = async (key, data) => {
  cookies().set(key, data);
};

export const getCookie = async (key) => {
  return cookies().get(key)?.value;
};

export const removeCookie = async (key) => {
  cookies().delete(key);
};
