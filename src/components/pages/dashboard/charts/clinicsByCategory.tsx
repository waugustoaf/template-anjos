import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// @ts-ignore
import { ApexOptions } from 'apexcharts';

import ReactApexcharts from '@/@core/components/react-apexcharts';

import { hexToRGBA } from '@/@core/utils/hex-to-rgba';
import { CardHeader } from '@mui/material';

interface LeadCaptureProps {
  quantity: number | undefined;
  convert: number | undefined;
  noConverted: number | undefined;
}

const ClinicsByCategory = ({
  quantity,
  convert,
  noConverted,
}: LeadCaptureProps) => {
  const theme = useTheme();

  const series = [100, 20, 10, 25, 25];

  const options: ApexOptions = {
    stroke: { width: 1 },
    labels: [
      'Escola Anjos Business',
      'Black Pass',
      'Mentoria Black',
      'Millions',
      'TIVE',
    ],
    colors: ['#e7e700', '#4d5166', '#000000', '#d2ae6d', '#ffa1a1'],
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18,
      },
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,
            },
            value: {
              offsetY: -17,
              fontWeight: 500,
              fontSize: '1.75rem',
              formatter: (val: any) => `${val}`,
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
            },
            total: {
              show: true,
              label: 'Leads',
              fontSize: '1.1rem',
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1650,
        options: {
          chart: { width: 350, height: 350 },
        },
      },
      {
        breakpoint: 1460,
        options: {
          chart: { width: 300, height: 300 },
        },
      },
    ],
  };

  return (
    <Card>
      <CardHeader
        title='Clínicas'
        subheader='Clínicas por catgoria'
        subheaderTypographyProps={{
          sx: { color: (theme) => `${theme.palette.text.disabled} !important` },
        }}
      />

      <CardContent>
        <ReactApexcharts
          type='donut'
          width={400}
          height={400}
          options={options}
          series={series}
        />
      </CardContent>
    </Card>
  );
};

export default ClinicsByCategory;
