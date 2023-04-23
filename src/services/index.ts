import { angelServices } from './angels';
import { authService } from './auth';
import { categoryServices } from './categories';
import { clinicServices } from './clinics';
import { salesFunnelServices } from './sales-funnels';
import { strategyServices } from '@/services/strategy';
import { productServices } from '@/services/product';
import { customerServices } from '@/services/customer';
import { userServices } from '@/services/user';
import { campaignsServices } from '@/services/campaigns';
import { autoPilotServices } from '@/services/auto-pilot';
import { customerTagServices } from '@/services/customer-tag';
import { DashboardServices } from '@/services/dashboard';
import { actionServices } from './actions';

export const apiServices = {
  action: actionServices,
  angel: angelServices,
  auth: authService,
  autoPilot: autoPilotServices,
  campaign: campaignsServices,
  categories: categoryServices,
  clinics: clinicServices,
  customer: customerServices,
  customerTag: customerTagServices,
  dashboard: DashboardServices,
  salesFunnel: salesFunnelServices,
  strategy: strategyServices,
  product: productServices,
  user: userServices,
};
