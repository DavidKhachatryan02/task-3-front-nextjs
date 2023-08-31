import { REST_API_URL } from "~/constants/enviroment";
import { refreshToken } from "~/actions/refreshToken";

export class ClientError {
  constructor(status, statusText, data) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
  }
}

const client = (config) => {
  const { baseUrl } = config;
  let retry = false;

  const get = async (path, config) => {
    const url = baseUrl + path;
    console.log(`[GET]: ${url}`);

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
      const refreshResponse = await refreshToken();

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
    console.log(`[POST]: ${url}`);

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
      console.log({ retry });
      if (response.status === 401 && !retry) {
        const { data: refreshResponse } = await refreshToken();
        retry = true;
        console.log(refreshResponse);

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

export const apiClient = client({
  baseUrl: REST_API_URL,
});
