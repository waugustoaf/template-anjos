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
  company: ICompany | null;
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
};

export interface LoginResponseProps {
  id: string;
  token: string;
  user: IUser;
  company: ICompany;
}

export interface SignUpResponseProps {
  user: IUser;
  company: ICompany;
}

export interface MeResponseProps extends IUser {
  company: ICompany;
}
