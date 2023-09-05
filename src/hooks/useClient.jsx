"use client";

import { useState, useCallback } from "react";
import { REST_API_URL } from "~/constants/enviroment";
import { RefreshToken } from "~/actions/refreshToken";
// import { setCookie } from "~/actions/cookie-actions";
// import { COOKIES_TOKEN_KEY } from "~/constants/config";

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
  const [apiClient] = useState(() => client(REST_API_URL));

  const get = useCallback(
    (path, config) => apiClient.get(path, config),
    [apiClient]
  );
  const post = useCallback(
    (path, body, config) => apiClient.post(path, body, config),
    [apiClient]
  );

  return {
    get,
    post,
  };
};
