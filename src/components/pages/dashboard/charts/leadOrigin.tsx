// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icons Imports
// ** Third Party Imports
// @ts-ignore
import {ApexOptions} from 'apexcharts';

// ** Custom Components Imports
import ReactApexcharts from '@/@core/components/react-apexcharts';

// ** Util Import
import {hexToRGBA} from '@/@core/utils/hex-to-rgba';
import {TextEllipsis} from "@/utils/text";

interface DataLeadCaptureProps {
  data: LeadCaptureProps[] | undefined;
}

interface LeadCaptureProps {
  origin: string;
  quantity: number;
}

const LeadOrigin = ({ data }: DataLeadCaptureProps) => {
  const theme = useTheme();

  if (!data) return (<></>);

  const sum  = data.reduce((acc, item) => acc + (item.quantity ? item.quantity : 0), 0);

  const options: ApexOptions = {
    colors: [
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.7),
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: [],
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
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { width: 200, height: 256 },
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { width: 150, height: 200 },
        },
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              gap: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography variant='h6' sx={{ mb: 0.5 }}>
                Leads por origem
              </Typography>
            </div>
          </Box>
          {data.map((item) => (

            <ReactApexcharts
              type='donut'
              width={150}
              height={179}
              options={{
                ...options,
                labels: [item.origin, item.origin],
                plotOptions: {
                  ...options.plotOptions,
                  pie: {
                    ...options.plotOptions?.pie,
                    donut: {
                      ...options.plotOptions?.pie?.donut,
                      labels: {
                        ...options.plotOptions?.pie?.donut?.labels,
                        total: {
                          ...options.plotOptions?.pie?.donut?.labels?.total,
                          label: TextEllipsis(item.origin, 8),
                        }
                      }
                    }
                  }
                },
              }}
              series={[item.quantity, sum - item.quantity]}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeadOrigin;
