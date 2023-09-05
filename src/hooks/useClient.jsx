"use client";

import { REST_API_URL } from "~/constants/enviroment";
import { RefreshToken } from "./api/refreshToken";

export class ClientError {
  constructor(status, statusText, data) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
  }
}

const client = (baseUrl) => {
  let retry = false;

  const get = async (path, config) => {
    const url = baseUrl + path;

    const response = await fetch(url, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers && config.headers),
      },
    });

    const data = await response.json();

    if (response.status === 401 && !retry) {
      retry = true;
      const refreshResponse = await RefreshToken();

      const { data: response } = await get(path, {
        ...config,
        headers: {
          Authorization: `Bearer ${refreshResponse.accessToken}`,
        },
      });

      retry = false;
      return { data: response };
    }

    if (!response.ok) {
      throw new ClientError(response.status, response.statusText, data.message);
    }

    return { data };
  };

  const post = async (path, body, config) => {
    const url = baseUrl + path;

    const response = await fetch(url, {
      ...config,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers && config.headers),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 && !retry) {
        const { data: refreshResponse } = await RefreshToken();
        retry = true;

        const { data: response } = await get(path, {
          ...config,
          headers: {
            Authorization: `Bearer ${refreshResponse.accessToken}`,
          },
        });

        retry = false;
        return response;
      }

      throw new ClientError(response.status, response.statusText, data.message);
    }

    return { data };
  };

  return {
    get,
    post,
  };
};

export const useApiClient = () => {
  const apiClient = client(REST_API_URL);

  return {
    get: apiClient.get,
    post: apiClient.post,
  };
};
