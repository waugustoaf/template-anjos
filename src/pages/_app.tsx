import { AclGuard } from '@/components/auth/acl-guard';
import { AuthGuard } from '@/components/auth/auth-guard';
import { GuestGuard } from '@/components/auth/guest-guard';
import { UserLayout } from '@/components/layout/user';
import { Spinner } from '@/components/spinner';
import { WindowWrapper } from '@/components/window-wrapper';
import { defaultACLObj } from '@/config/acl';
import { themeConfig } from '@/config/app';
import { AuthProvider } from '@/hooks/useAuth';
import { SettingsConsumer, SettingsProvider } from '@/hooks/useSettings';
import { store } from '@/store';
import ReactHotToast from '@/styles/libs/react-hot-toast';
import { ThemeComponent } from '@/theme/theme-component';
import { createEmotionCache } from '@/utils/cache/emotion';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import moment from 'moment';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import '@/styles/global.css';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { Box } from '@mui/material';
import { VerticalNavItems } from '@/navigation';

interface ExtendedAppProps extends AppProps {
  Component: NextPage;
  emotionCache: EmotionCache;
}

interface GuardProps {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
}

moment.locale('pt-br');

const clientSideEmotionCache = createEmotionCache();

if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const ResolveGuard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));

  const setConfig = Component.setConfig ?? undefined;

  const authGuard = Component.authGuard ?? true;

  const guestGuard = Component.guestGuard ?? false;

  const aclAbilities = Component.acl ?? defaultACLObj;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName}`}</title>
          <meta name='description' content={`${themeConfig.templateName}`} />
          <meta name='keywords' content='Anjos Guia, Estética, Esteticista' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <SettingsProvider
            {...(setConfig ? { pageSettings: setConfig() } : {})}
          >
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <SettingsConsumer>
                  {({ settings }) => {
                    return (
                      <ThemeComponent settings={settings}>
                        <DatePickerWrapper>
                          <WindowWrapper>
                            <ResolveGuard
                              authGuard={authGuard}
                              guestGuard={guestGuard}
                            >
                              <AclGuard
                                aclAbilities={aclAbilities}
                                guestGuard={guestGuard}
                              >
                                <Box maxWidth='100vw' overflow='hidden'>
                                  {getLayout(<Component {...pageProps} />)}
                                </Box>
                              </AclGuard>
                            </ResolveGuard>
                          </WindowWrapper>
                          <ReactHotToast>
                            <Toaster
                              position={settings.toastPosition}
                              toastOptions={{ className: 'react-hot-toast' }}
                            />
                          </ReactHotToast>
                        </DatePickerWrapper>
                      </ThemeComponent>
                    );
                  }}
                </SettingsConsumer>
              </Hydrate>
            </QueryClientProvider>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
}
