import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import { GetDashboard } from './types';
import {
  formatNumberFromBase100,
  formatNumberToBase100,
} from '@/utils/currency';

const baseUrl = '/dashboard';

export const DashboardServices = {
  clinic: async (campaignId?: string | null) => {
    const { data } = await api.post<GetDashboard>(
      `${baseUrl}/clinic`,
      undefined,
      {
        params: {
          campaignId,
        },
      },
    );

    data.data.financial = {
      value: formatNumberFromBase100(data.data.financial.value),
      percent: formatNumberFromBase100(data.data.financial.percent),
    };

    data.data.statistics = {
      leads: data.data.statistics.leads,
      sales: data.data.statistics.sales,
      middleticket: formatNumberFromBase100(data.data.statistics.middleticket),
    };

    data.data.campaign = {
      percent: formatNumberFromBase100(data.data.campaign.percent),
      daysOf: data.data.campaign.daysOf,
      goal: formatNumberFromBase100(data.data.campaign.goal),
      endMonthDays: data.data.campaign.endMonthDays,
    };

    data.data.leads.noConverted = 20;

    data.data.productByFinancial = data.data.productByFinancial.map(
      (product) => {
        return {
          ...product,
          value: formatNumberFromBase100(product.value),
        };
      },
    );

    data.data.productBySales = data.data.productBySales.map((product) => {
      return {
        ...product,
        value: formatNumberFromBase100(product.value),
      };
    });
    return data.data;
  },
  admin: async (id: string) => {
    const response = await api.get<GetDashboard>(`${baseUrl}/admin`);

    return response.data;
  },
};
