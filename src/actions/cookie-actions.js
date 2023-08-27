"use server";
import { cookies } from "next/headers";

export const hasKey = async (key) => {
  return cookies().has(key);
};

export const setCookie = async (key, data) => {
  cookies().delete(key);

  cookies().set(key, data);

  return true;
};

export const getCookie = async (key) => {
  return cookies().get(key)?.value;
};

export const removeCookie = async (key) => {
  cookies().delete(key);
  return true;
};
