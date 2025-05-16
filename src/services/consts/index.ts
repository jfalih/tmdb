import {type DefaultOptions} from '@tanstack/react-query';

export const LOGO_URL = '/assets/illustrations/logo-jiwa+.svg';

export const DEFAULT_PAGINATION_PAGE = 1;
export const DEFAULT_PAGINATION_SIZE = 10;

export const REACT_QUERY_DEFAULT_OPTIONS: DefaultOptions = {
  queries: {
    retry: 0,
    refetchInterval: 0,
    refetchOnWindowFocus: false,
  },
};

export const COOKIE_SESSION = 'cookieSession';