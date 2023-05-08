import {api} from '@/utils/api';
import {formatNumberFromBase100} from '@/utils/currency';
import {GetDashboard} from './types';
import {IDashTopBilling} from "@/types/entities/IDashboard";

const baseUrl = '/dashboard';

export const DashboardServices = {
  clinic: async (campaignId?: string | null, ownersIds?: string[]) => {
    const owners = ownersIds?.map((id) => `ownerId=${id}`).join('&');

    const { data } = await api.post<GetDashboard>(
      `${baseUrl}/clinic?${campaignId ? `campaignId=${campaignId}` : ''}${
        owners ? '&' + owners : ''
      }`,
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

    data.data.salesByFunnel = data.data.salesByFunnel.sort((a, b) => {
      return b.value - a.value;
    });

    data.data.productByFinancial = data.data.productByFinancial.sort((a, b) => {
      return b.value - a.value;
    }).slice(0, 3)

    data.data.productBySales = data.data.productBySales.sort((a, b) => {
      return b.quantity - a.quantity;
    }).slice(0, 3);

    return data.data;
  },
  admin: async () => {
    const { data } = await api.post<GetDashboard>(`${baseUrl}/admin`);

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

    data.data.salesByFunnel = data.data.salesByFunnel.sort((a, b) => {
      return b.value - a.value;
    });


    data.data.clinicsWithPlan.total = data.data.clinicsWithPlan.withPlan + data.data.clinicsWithPlan.withoutPlan;

    if (data.data.clinicsWithPlan.total > 0 ) {
      data.data.clinicsWithPlan.percent = Math.round(data.data.clinicsWithPlan.withPlan / data.data.clinicsWithPlan.total);
    } else {
      data.data.clinicsWithPlan.percent = 0;
    }


    const top10Billing: IDashTopBilling[] = [];
    data?.data?.topBilling?.forEach((item: IDashTopBilling) => {
      top10Billing.push({
        ...item,
        financialResult: formatNumberFromBase100(item.financialResult ?? 0),
      })
    });

    data.data.topBilling = top10Billing.sort((a, b) => {
      return b.financialResult - a.financialResult;
    }).slice(0, 10);


    return data.data;
  },
};
