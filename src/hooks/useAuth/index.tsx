import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { authConfig } from '@/config/auth';
import { api } from '@/utils/api';
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  LoginResponseProps,
  MeResponseProps,
  RegisterParams,
  UserDataType,
} from './types';
import { toast } from 'react-hot-toast';

const defaultProvider: AuthValuesType = {
  user: {
    user: null,
    clinic: null,
  },
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  handleUpdateToken: () => Promise.resolve(),
  handleUpdateUser: () => Promise.resolve(),
  refetchUser: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();

  let timeout: NodeJS.Timeout;

  const initAuth = async (withoutLoading?: boolean): Promise<void> => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )!;

    if (storedToken) {
      if (!withoutLoading) {
        setLoading(true);
      }

      //let hasResponse = false;

      /*timeout = setTimeout(() => {
        if (hasResponse) return;

        localStorage.removeItem('@anjos-guia:userData');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        setUser(null);
        if (!withoutLoading) {
          setLoading(false);
        }
        if (
          authConfig.onTokenExpiration === 'logout' &&
          !router.pathname.includes('login')
        ) {
          router.replace('/login');
        }
      }, 15 * 1000);*/

      await api
        .get<MeResponseProps>(authConfig.meEndpoint, {
          headers: {
            Authorization: storedToken,
          },
        })
        .then(async (response) => {
          const { clinic, user } = response.data.data;

          if (!withoutLoading) {
            setLoading(false);
          }
          setUser({ user, clinic });
        })
        .catch(() => {
          localStorage.removeItem('@anjos-guia:userData');
          localStorage.removeItem('@anjos-guia:refreshToken');
          localStorage.removeItem('@anjos-guia:accessToken');
          setUser(null);

          if (!withoutLoading) {
            setLoading(false);
          }

          toast.error(
            'Não foi possível recuperar o usuário logado. Por favor, relogue-se.',
          );

          router.replace('/login');
        });
    } else {
      if (!withoutLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleUpdateToken(token: string) {
    window.localStorage.setItem(authConfig.storageTokenKeyName, token);
  }

  function handleUpdateUser(user: UserDataType) {
    setUser(user);
    window.localStorage.setItem('@anjos-guia:userData', JSON.stringify(user));
  }

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
    finallyCallback = () => {
      {
      }
    },
  ) => {
    window.localStorage.removeItem(authConfig.storageTokenKeyName);

    api
      .post<LoginResponseProps>(authConfig.loginEndpoint, params)
      .then(async (response: any) => {
        params.rememberMe
          ? window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              response.data.data.token,
            )
          : null;
        const returnUrl = router.query.returnUrl;

        initAuth();

        params.rememberMe
          ? window.localStorage.setItem(
              '@anjos-guia:userData',
              JSON.stringify(response.data.data),
            )
          : null;

        finallyCallback && finallyCallback();

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';

        router.replace(redirectURL as string);
      })
      .catch((err) => {
        console.log({ err });

        if (errorCallback) errorCallback(err);

        finallyCallback && finallyCallback();
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('@anjos-guia:userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push('/login');
  };

  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType,
  ) => {
    api
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback)
            errorCallback(
              res.data.error.reduce((prevValue, currState) => {
                return { ...prevValue, [currState]: currState };
              }, {}),
            );
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null,
      );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    handleUpdateToken,
    handleUpdateUser,
    refetchUser: initAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };
