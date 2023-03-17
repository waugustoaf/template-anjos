export interface IAngel {
  id: string;
  name: string;
  email: string;
  password?: string;
  grantType?: 100 | 190;
  categories: string[];
}
