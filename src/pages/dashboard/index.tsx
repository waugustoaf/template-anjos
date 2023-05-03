// ** MUI Import
import Grid from '@mui/material/Grid';

// ** Demo Component Imports
import CongratulationsPerson from '@/components/pages/dashboard/charts/congratulationsPerson';
import ResumeHorizontal from '@/components/pages/dashboard/charts/resumeHorizontal';

// ** Custom Component Import
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
import { Spinner } from '@/components/spinner';
import { useQuery } from '@tanstack/react-query';
import { apiServices } from '@/services';
import { useState } from 'react';

const DefaultDashboard = () => {
  const [campaignId, setCampaignId] = useState<string | null>(() => {
    const defaultItem = localStorage.getItem('@anjosguia:dashboard:campaignId');
    if (defaultItem) return defaultItem;
    return null;
  });

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', campaignId],
    queryFn: () => apiServices.dashboard.clinic(campaignId),
  });

  if (isLoading && !data) return <Spinner />;

  // @ts-ignore
  // @ts-ignore
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CongratulationsPerson
            percentage={data?.financial?.percent}
            value={data?.financial.value}
            campaignStatus={data?.campaign.campaignStatus}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ResumeHorizontal
            leads={data?.statistics?.leads}
            sales={data?.statistics?.sales}
            ticket={data?.statistics?.middleticket}
            currentCampaign={campaignId}
            setCurrentCampaign={setCampaignId}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={3} lg={6}>
              <CampaignTime
                percent={data?.campaign?.percent}
                daysOf={data?.campaign?.daysOf}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <CampaignGoal
                goal={data?.campaign?.goal}
                endMonthDays={data?.campaign?.endMonthDays}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <LeadCapture
                noConverted={data?.leads?.noConverted}
                convert={data?.leads?.convert}
                quantity={data?.leads?.quantity}
              />
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
          <SalesByStrategy data={data?.salesByStrategies} />
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
