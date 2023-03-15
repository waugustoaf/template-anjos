import { ICustomerCategory } from './ICustomerCategory';

export interface ICustomer {
  id: string;
  companyId: string;
  status: 'ACTIVE' | 'INACTIVE';
  name: string;
  cellphone: string;
  whatsapp: string;
  birthday: string | null;
  origin: string | null;
  descOrigin: string | null;
  sex: string | null;
  email: string;
  document: string;
  instagram: string;
  observation: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  categories: {
    id: string;
    category: ICustomerCategory[];
  }[];
  createdAt: string;
  updatedAt: string;
}
