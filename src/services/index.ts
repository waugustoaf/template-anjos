import { authService } from './auth';
import { customerServices } from './customers';

export const apiServices = {
  auth: authService,
  customers: customerServices,
};
