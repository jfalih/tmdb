 
 
import { getSessionCookie } from '@/services/hooks/utils';
import {toJSON} from './helper';
import { env } from '@/services/env/client';

interface OptionRequest extends RequestInit {
  method?: 'get' | 'post' | 'delete' | 'put' | 'patch';
}

const baseRequest = async (url: RequestInfo, options?: OptionRequest) => {
  const session = getSessionCookie();
  return fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }).then((response: Response) => {
    if (response.ok) {
      return response;
    }

    return (
      response
        .text()
        .then((result) => JSON.parse(result))
        .then((result) => {
          if (result.statusCode === 401 && session) {
            // Set Logout User
          }

          return Promise.reject({
            ...result,
            statusCode: result.statusCode,
            message: result.message,
            error: result.error,
            type: result.type,
          });
        })
    );
  });
};

export const request = <T>(url: RequestInfo, options?: OptionRequest) =>
  baseRequest(url, options)
    .then(toJSON)
    .then((res) => res as T);
