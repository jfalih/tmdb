import qs from 'query-string';
import {RecordQuery} from './url.types';
import { env } from '@/services/env/client';

const baseUrl = (
  host: string | undefined,
  path: string,
  query?: RecordQuery,
): string => qs.stringifyUrl({url: new URL(path, host).toString(), query});

export const apiUrl = (path: string, query?: RecordQuery): string =>
  baseUrl(env.NEXT_PUBLIC_TMDB_API_URL, path, query);