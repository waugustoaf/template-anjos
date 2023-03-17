import { authService } from './auth';
import { categoryServices } from './categories';
import { salesFunnelServices } from './sales-funnels';

export const apiServices = {
  auth: authService,
  categories: categoryServices,
  salesFunnel: salesFunnelServices,
  // customers: customerServices,
};
