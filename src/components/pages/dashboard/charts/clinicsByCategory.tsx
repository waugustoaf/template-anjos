import Card from '@mui/material/Card';
import {useTheme} from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';

// @ts-ignore
import {ApexOptions} from 'apexcharts';

import ReactApexcharts from '@/@core/components/react-apexcharts';
import {CardHeader} from '@mui/material';

interface DataClinicsCategoryProps {
  data: ClinicsCategoryProps[] | undefined;
}

interface ClinicsCategoryProps {
  id: string;
  name: string;
  clinics: number;
}

const colorsArr = [
  '#D2AE6D',
  '#FFB326',
  '#E89B0C',
  '#E89B0C',
  '#00449C',
  '#0C6DE8',
  '#0C6DE8',];

const ClinicsByCategory = ({data}: DataClinicsCategoryProps) => {
  const theme = useTheme();

  const series: number[] = [];

  const labels: string[] = [];

  const colors: string[] = [];

  data?.map((item: ClinicsCategoryProps, index) => {
    labels.push(item.name)
    series.push(item.clinics)
    colors.push(colorsArr[index])
  });


  const options: ApexOptions = {
    stroke: { width: 1 },
    labels: labels,
    colors: colors,
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
              label: 'Clínicas',
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
