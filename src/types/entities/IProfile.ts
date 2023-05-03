export interface IProfile {
  id: string;
  fullName: string;
  name: string;
  email: string | undefined;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  avatar?: string;
}