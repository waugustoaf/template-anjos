import { angelServices } from './angels';
import { authService } from './auth';
import { categoryServices } from './categories';
import { clinicServices } from './clinics';
import { salesFunnelServices } from './sales-funnels';
import {strategyServices} from "@/services/strategy";
import {productServices} from "@/services/product";
import {customerServices} from "@/services/customer";
import {userServices} from "@/services/user";

export const apiServices = {
  auth: authService,
  angel: angelServices,
  categories: categoryServices,
  clinics: clinicServices,
  salesFunnel: salesFunnelServices,
  strategy: strategyServices,
  product: productServices,
  customer: customerServices,
  user: userServices,
};
