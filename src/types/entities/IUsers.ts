import { ThemeColor } from "../app/layout";

export interface IUser {
  id: string;
  email: string;
  name: string;
  fullName: string;
  avatar: string | null;
  companyId: string;
  grantType: number;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin: string | null;
  verifiedAt: string | null;
}

export interface ProjectListDataType {
  id: number;
  img: string;
  hours: string;
  totalTask: string;
  projectType: string;
  projectTitle: string;
  progressValue: number;
  progressColor: ThemeColor;
}