import { IClinic } from '@/types/entities/IClinic';
import { IUser } from '@/types/entities/IUsers';
import { api } from '@/utils/api';
import { ChangePasswordWithTokenProps } from './types';

export const authService = {
  requestResetToken: async (email: string) => {
    const response = await api.post('/auth/resetPassword', { email });

    return response.data;
  },
  changePasswordWithToken: async ({
    email,
    password,
    token,
  }: ChangePasswordWithTokenProps) => {
    const response = await api.post(`/auth/changePasswordToken/${token}`, {
      password,
      email,
    });

    return response.data;
  },
  resendVerificationEmail: async (email: string) => {
    const response = await api.post('/auth/resendVerificationEmail', { email });

    return response.data;
  },
  updateClinic: async (clinicId: string) => {
    const response = await api.post<{
      id: string;
      user: IUser;
      clinic: IClinic;
      token: string;
    }>('/auth/changeClinic', { clinicId });

    return response.data;
  },
};
