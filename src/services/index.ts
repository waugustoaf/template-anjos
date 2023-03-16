import { authService } from './auth';
import { categoryServices } from './categories';

export const apiServices = {
  auth: authService,
  categories: categoryServices,
  // customers: customerServices,
};
