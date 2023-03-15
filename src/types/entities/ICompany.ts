export interface ICompany {
  id: string;
  name: string;
  cellPhone: string;
  email: string;
  document: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}