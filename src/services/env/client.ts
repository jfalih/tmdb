import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_NODE_ENV: z.string(),
    NEXT_PUBLIC_TMDB_API_KEY: z.string(),
    NEXT_PUBLIC_TMDB_API_URL: z.string(),
    NEXT_PUBLIC_TMDB_IMAGE_URL: z.string(),
    NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    NEXT_PUBLIC_TMDB_API_URL: process.env.NEXT_PUBLIC_TMDB_API_URL,
    NEXT_PUBLIC_TMDB_IMAGE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_URL,
    NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN: process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN,
  },
});
