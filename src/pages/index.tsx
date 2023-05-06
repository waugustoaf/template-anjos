import Grid from '@mui/material/Grid';

import CongratulationsPerson from '@/components/pages/dashboard/charts/congratulationsPerson';
import ResumeHorizontal from '@/components/pages/dashboard/charts/resumeHorizontal';

import ApexChartWrapper from '@/@core/styles/react-apexcharts';
import LeadCapture from '@/components/pages/dashboard/charts/leadCapture';
import LeadConvert from '@/components/pages/dashboard/charts/leadConvertion';
import CampaignGoal from '@/components/pages/dashboard/charts/campaignGoal';
import CampaignTime from '@/components/pages/dashboard/charts/campaignTime';
import AccomplishedExpected from '@/components/pages/dashboard/charts/accomplishedExpected';
import SalesByFunnel from '@/components/pages/dashboard/charts/salesByFunnel';
import StrategyConversionValue from '@/components/pages/dashboard/charts/strategyByConversionValue';
import StrategyConversionQuantity from '@/components/pages/dashboard/charts/strategyByConversionQuantity';
import ProductsByInvoicing from '@/components/pages/dashboard/charts/productsByInvoicing';
import ProductsBySalesQuantity from '@/components/pages/dashboard/charts/productsByQuantity';
import {useQuery} from '@tanstack/react-query';
import {Spinner} from '@/components/spinner';
import {apiServices} from '@/services';

const DefaultDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiServices.dashboard.clinic()
  });

  if (isLoading && !data) return <Spinner />;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CongratulationsPerson percentage={data?.financial?.percent} value={data?.financial.value} campaignStatus={data?.campaign?.campaignStatus} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ResumeHorizontal leads={data?.statistics?.leads} sales={data?.statistics?.sales} ticket={data?.statistics?.middleticket} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={3} lg={6}>
              <CampaignTime percent={data?.campaign?.percent} daysOf={data?.campaign?.daysOf} />
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <CampaignGoal goal={data?.campaign?.goal} endMonthDays={data?.campaign?.endMonthDays} />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <LeadCapture noConverted={data?.leads?.noConverted} convert={data?.leads?.convert} quantity={data?.leads?.quantity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <LeadConvert data={data?.leadsConversion} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <AccomplishedExpected data={data?.goalPoints} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SalesByFunnel data={data?.salesByStrategies} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <ProductsByInvoicing data={data?.productByFinancial} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <ProductsBySalesQuantity data={data?.productBySales} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <StrategyConversionValue data={data?.strategyConversionValue} />
        </Grid>
        <Grid item xs={6} lg={6}>
          <StrategyConversionQuantity data={data?.strategyConversionQuantity} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default DefaultDashboard;
