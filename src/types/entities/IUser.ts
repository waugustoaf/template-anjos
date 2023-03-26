export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  grantType?: 10 | 90 | 100 | 190;
}
