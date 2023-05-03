import {api} from '@/utils/api';
import {GetDashboard} from './types';
import {formatNumberFromBase100} from "@/utils/currency";

const baseUrl = '/dashboard';

export const DashboardServices = {
  clinic: async () => {
    const { data } = await api.post<GetDashboard>(`${baseUrl}/clinic`);

    data.data.financial = {
      value: formatNumberFromBase100(data.data.financial.value),
      percent: formatNumberFromBase100(data.data.financial.percent),
    }

    data.data.statistics = {
      leads: data.data.statistics.leads,
      sales: data.data.statistics.sales,
      middleticket: formatNumberFromBase100(data.data.statistics.middleticket),
    }

    data.data.campaign = {
      percent: formatNumberFromBase100(data.data.campaign.percent),
      daysOf: data.data.campaign.daysOf,
      goal: formatNumberFromBase100(data.data.campaign.goal),
      endMonthDays: data.data.campaign.endMonthDays,
      campaignStatus: data.data.campaign.campaignStatus,
    }

    data.data.productByFinancial = data.data.productByFinancial.map((product) => {
      return {
        ...product,
        value: formatNumberFromBase100(product.value),
      }
    });

    data.data.productBySales = data.data.productBySales.map((product) => {
      return {
        ...product,
        value: formatNumberFromBase100(product.value),
      }
    });
    return data.data;
  },
  admin: async (id: string) => {
    const response = await api.get<GetDashboard>(`${baseUrl}/admin`);

    return response.data;
  },
};
