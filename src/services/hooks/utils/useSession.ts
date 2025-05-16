
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {GetServerSidePropsContext} from 'next';
import {useEffect, useState} from 'react';
import {z} from 'zod';
import {COOKIE_SESSION} from '../../consts';

const sessionSchema = z.object({
  token: z.string(),
  expiresIn: z.string(),
});

type SessionSchema = z.infer<typeof sessionSchema>;

export const getSessionCookie = (ctx?: GetServerSidePropsContext) => {
  const sessionCookie = getCookie(COOKIE_SESSION, {
    req: ctx?.req,
    res: ctx?.res,
  })?.toString();

  return validateSessionCookie(sessionCookie);
};

export const validateSessionCookie = (sessionCookie?: string) => {
  if (sessionCookie) {
    try {
      return sessionSchema.parse(JSON.parse(sessionCookie));
    } catch {
      deleteSessionCookie();
      return null;
    }
  }

  return null;
};

export const deleteSessionCookie = (ctx?: GetServerSidePropsContext) =>
  deleteCookie(COOKIE_SESSION, {
    req: ctx?.req,
    res: ctx?.res,
  });

export const setSessionCookie = (session: SessionSchema) =>
  setCookie(COOKIE_SESSION, JSON.stringify(session), {
    expires: new Date(session.expiresIn),
  });

const useSession = () => {
  const [session, setStateSession] = useState<SessionSchema | null | undefined>(
    null,
  );

  useEffect(() => {
    setStateSession(getSessionCookie());
  }, []);

  const setSession = (session: SessionSchema) => {
    setSessionCookie(session);
    setStateSession(session);
  };

  return [session, setSession] as const;
};

export default useSession;
