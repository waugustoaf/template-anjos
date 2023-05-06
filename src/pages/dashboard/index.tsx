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
import SalesByFunnel from '@/components/pages/dashboard/charts/salesByFunnel';
import {Spinner} from '@/components/spinner';
import {useQuery} from '@tanstack/react-query';
import {apiServices} from '@/services';
import {useState} from 'react';
import ClinicWithPlan from "@/components/pages/dashboard/charts/clinicWithPlan";
import TopBilling from '@/components/pages/dashboard/charts/topBilling';

const DefaultDashboard = () => {
  const [campaignId, setCampaignId] = useState<string | null>(() => {
    const defaultItem = localStorage.getItem('@anjosguia:dashboard:campaignId');
    if (defaultItem) return defaultItem;
    return null;
  });

  const { data, isLoading } = useQuery({
    queryKey: ['dashboardAdmin'],
    queryFn: () => apiServices.dashboard.admin(),
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
              <CampaignGoal
                goal={data?.campaign?.goal}
                endMonthDays={data?.campaign?.endMonthDays}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <ClinicWithPlan
                percent={20}
                totalClinics={100}
                withPlan={20}
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
          <TopBilling  />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SalesByFunnel data={data?.salesByStrategies} />
        </Grid>

        {/*<Grid item xs={12} lg={4}>
          <ClinicsByCategory />
        </Grid>*/}


      </Grid>
    </ApexChartWrapper>
  );
};

export default DefaultDashboard;
