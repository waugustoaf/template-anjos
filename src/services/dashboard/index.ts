import {api} from '@/utils/api';
import {formatNumberFromBase100} from '@/utils/currency';
import {GetDashboard} from './types';

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
      campaignStatus: data.data.campaign.campaignStatus,
    };

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
  admin: async () => {
    const { data } = await api.post<GetDashboard>(`${baseUrl}/admin`);

    console.log('admin',data);

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
      campaignStatus: data.data.campaign.campaignStatus,
    };

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
};
