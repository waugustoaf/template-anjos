import Grid from '@mui/material/Grid';

import CongratulationsPerson from '@/components/pages/dashboard/charts/congratulationsPerson';

import ApexChartWrapper from '@/@core/styles/react-apexcharts';
import LeadCapture from '@/components/pages/dashboard/charts/leadCapture';
import LeadConvert from '@/components/pages/dashboard/charts/leadConvertion';
import CampaignGoal from '@/components/pages/dashboard/charts/campaignGoal';
import SalesByFunnel from '@/components/pages/dashboard/charts/salesByFunnel';
import {Spinner} from '@/components/spinner';
import {useQuery} from '@tanstack/react-query';
import {apiServices} from '@/services';
import {useState} from 'react';
import ClinicWithPlan from '@/components/pages/dashboard/charts/clinicWithPlan';
import TopBilling from '@/components/pages/dashboard/charts/topBilling';
import ClinicsByCategory from '@/components/pages/dashboard/charts/clinicsByCategory';
import ResumeHorizontalAdmin from '@/components/pages/dashboard/charts/resumeHorizontalAdmin';
import {ICategory} from "@/types/entities/ICategory";

interface FilterProps {
  categoryIds: ICategory[];
  states: string[]
}

const DefaultDashboard = () => {
  const [filters, setFilters] = useState<FilterProps>({
    categoryIds: [],
    states: []
  });
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

  function handleFilter(data: FilterProps) {
    setFilters(data);
  }

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
          <ResumeHorizontalAdmin
            leads={data?.statistics?.leads}
            sales={data?.statistics?.sales}
            ticket={data?.statistics?.middleticket}
            filters={filters}
            handleFilter={handleFilter}
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
              <ClinicWithPlan percent={data?.clinicsWithPlan?.percent} totalClinics={data?.clinicsWithPlan?.total} withPlan={data?.clinicsWithPlan?.withPlan} />
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
          <TopBilling data={data?.topBilling} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SalesByFunnel data={data?.salesByFunnel} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ClinicsByCategory data={data?.clinicsWithCategory} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default DefaultDashboard;
