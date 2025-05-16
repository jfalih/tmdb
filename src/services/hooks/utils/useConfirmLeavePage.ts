import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export const useConfirmLeavePage = (initIsDirty = true) => {
  const [isDirty, setIsDirty] = useState(initIsDirty);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const handleRouteChange = () => {
      if (window.confirm('Are you sure you want to leave this page?')) return;
      else {
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
      }
    };

    if (isDirty) {
      router.events.on('routeChangeStart', handleRouteChange);
    }
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.isReady, isDirty, router.events]);

  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = true);
    };

    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return [setIsDirty];
};

export default useConfirmLeavePage;
