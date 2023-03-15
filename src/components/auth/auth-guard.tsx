import { ReactNode, ReactElement, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (
        auth.user?.user === null &&
        !window.localStorage.getItem('@anjos-guia:userData')
      ) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace('/login');
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route],
  );

  if (auth.loading || !auth.user?.user) {
    return fallback;
  }

  return <>{children}</>;
};
