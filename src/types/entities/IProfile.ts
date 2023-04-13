export interface IProfile {
  id: string;
  name: string;
  email: string | undefined;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}