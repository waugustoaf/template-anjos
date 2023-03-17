import { angelServices } from './angels';
import { authService } from './auth';
import { categoryServices } from './categories';
import { salesFunnelServices } from './sales-funnels';

export const apiServices = {
  auth: authService,
  angel: angelServices,
  categories: categoryServices,
  salesFunnel: salesFunnelServices,
};
