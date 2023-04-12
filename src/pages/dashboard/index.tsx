// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CongratulationsPerson from '@/components/pages/dashboard/charts/congratulationsPerson'
import ResumeHorizontal from "@/components/pages/dashboard/charts/resumeHorizontal";

// ** Custom Component Import
import ApexChartWrapper from '@/@core/styles/react-apexcharts'
import LeadCapture from "@/components/pages/dashboard/charts/leadCapture";
import LeadConvert from "@/components/pages/dashboard/charts/leadConvertion";
import CampaignGoal from "@/components/pages/dashboard/charts/campaignGoal";
import CampaignTime from "@/components/pages/dashboard/charts/campaignTime";
import AccomplishedExpected from "@/components/pages/dashboard/charts/accomplishedExpected";
import SalesByStrategy from "@/components/pages/dashboard/charts/salesByStrategy";
import StrategyConversionValue from "@/components/pages/dashboard/charts/strategyByConversionValue";
import StrategyConversionQuantity from "@/components/pages/dashboard/charts/strategyByConversionQuantity";
import ProductsByInvoicing from "@/components/pages/dashboard/charts/productsByInvoicing";
import ProductsBySalesQuantity from "@/components/pages/dashboard/charts/productsByQuantity";

const DefaultDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CongratulationsPerson percentage={53} value={103.3} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ResumeHorizontal />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={3} lg={6}>
              <CampaignTime />
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <CampaignGoal />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <LeadCapture />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <LeadConvert />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <AccomplishedExpected />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SalesByStrategy />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <ProductsByInvoicing />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <ProductsBySalesQuantity />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <StrategyConversionValue />
        </Grid>
        <Grid item xs={6} lg={6}>
          <StrategyConversionQuantity />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default DefaultDashboard
