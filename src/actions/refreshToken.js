'use server';
import { COOKIE_TOKEN_KEY, COOKIES_REFRESH_KEY } from '~/constants/config';
import { apiClient } from '~/services/client';
import { getCookie, setCookie } from '~/actions/cookie-actions';

export const refreshToken = async () => {
  const refToken = await getCookie(COOKIES_REFRESH_KEY);
  const accessToken = await getCookie(COOKIE_TOKEN_KEY);

  if (!refToken || !accessToken) throw new Error('Invalid data');

  const payload = { refreshToken: refToken, accessToken };

  const { data } = await apiClient.post('/auth/refreshToken', payload, {
    cache: 'no-store',
  });

  // await setCookie(COOKIE_TOKEN_KEY, data.accessToken);
  // console.log('set cookie', data.accessToken);

  return data;
};
