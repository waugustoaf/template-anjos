import { angelServices } from './angels';
import { authService } from './auth';
import { categoryServices } from './categories';
import { clinicServices } from './clinics';
import { salesFunnelServices } from './sales-funnels';

export const apiServices = {
  auth: authService,
  angel: angelServices,
  categories: categoryServices,
  clinics: clinicServices,
  salesFunnel: salesFunnelServices,
};
