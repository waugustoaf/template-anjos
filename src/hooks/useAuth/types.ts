import { IClinic } from '@/types/entities/IClinic';
import { ICompany } from '@/types/entities/ICompany';
import { IUser } from '@/types/entities/IUsers';

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterParams = {
  companyName: string;
  document: string;
  fullName: string;
  cellPhone: string;
  email: string;
  password: string;
};

export type UserDataType = {
  user: IUser | null;
  clinic: IClinic | null;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
    finallyCallback?: (data?: any) => any,
  ) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
  handleUpdateToken: (token: string) => void;
  handleUpdateUser: (user: UserDataType) => void;
  refetchUser: (withoutLoading?: boolean) => Promise<void>;
};

export interface LoginResponseProps {
  id: string;
  token: string;
  user: IUser;
  clinic: IClinic | null;
}

export interface SignUpResponseProps {
  user: IUser;
  clinic: IClinic;
}

export interface MeResponseProps {
  user: IUser | null;
  clinic: IClinic | null;
}
