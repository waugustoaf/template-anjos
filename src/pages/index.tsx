import Grid from '@mui/material/Grid';

import CongratulationsPerson from '@/components/pages/dashboard/charts/congratulationsPerson';
import ResumeHorizontal from '@/components/pages/dashboard/charts/resumeHorizontal';

import ApexChartWrapper from '@/@core/styles/react-apexcharts';
import LeadCapture from '@/components/pages/dashboard/charts/leadCapture';
import LeadConvert from '@/components/pages/dashboard/charts/leadConvertion';
import CampaignGoal from '@/components/pages/dashboard/charts/campaignGoal';
import CampaignTime from '@/components/pages/dashboard/charts/campaignTime';
import AccomplishedExpected from '@/components/pages/dashboard/charts/accomplishedExpected';
import SalesByStrategy from '@/components/pages/dashboard/charts/salesByStrategy';
import StrategyConversionValue from '@/components/pages/dashboard/charts/strategyByConversionValue';
import StrategyConversionQuantity from '@/components/pages/dashboard/charts/strategyByConversionQuantity';
import ProductsByInvoicing from '@/components/pages/dashboard/charts/productsByInvoicing';
import ProductsBySalesQuantity from '@/components/pages/dashboard/charts/productsByQuantity';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/spinner';
import { apiServices } from '@/services';

const DefaultDashboard = () => {
  const { data, isLoading } = useQuery([], async () => {
    return await apiServices.campaign.list();
  });

  if (isLoading) return <Spinner />;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CongratulationsPerson value={53000} percentage={103.3} />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <ResumeHorizontal /> */}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={3} lg={6}>
              {/* <CampaignTime /> */}
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              {/* <CampaignGoal /> */}
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              {/* <LeadCapture /> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          {/* <LeadConvert /> */}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {/* <AccomplishedExpected /> */}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {/* <SalesByStrategy /> */}
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          {/* <ProductsByInvoicing /> */}
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          {/* <ProductsBySalesQuantity /> */}
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          {/* <StrategyConversionValue /> */}
        </Grid>
        <Grid item xs={6} lg={6}>
          {/* <StrategyConversionQuantity /> */}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default DefaultDashboard;
