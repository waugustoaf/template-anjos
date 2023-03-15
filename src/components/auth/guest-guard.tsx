import { ReactNode, ReactElement, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

export const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (window.localStorage.getItem('@anjos-guia:userData')) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route]);

  if (auth.loading || (!auth.loading && !!auth.user?.user)) {
    return fallback;
  }

  return <>{children}</>;
};
