// ** React Imports
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid, {GridProps} from '@mui/material/Grid'
import {styled, useTheme} from '@mui/material/styles'

// ** Icons Imports
// ** Third Party Imports
import {ApexOptions} from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from '@/@core/components/react-apexcharts'

// ** Hook Import
// ** Util Import
import {hexToRGBA} from '@/@core/utils/hex-to-rgba'

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

interface DataLeadStrategyProps {
  data: LeadStrategyProps[] | undefined
}

interface LeadStrategyProps {
  strategyId?: string;
  name?: string;
  gain?: number;
  lost?: number;
}

const LeadConvert = ( { data }: DataLeadStrategyProps ) => {

  const barSeries = [
    { name: 'Ganhos', data: [] },
    { name: 'Perdas', data: [] }
  ]

  const categories:string[] = [];


  //ToDo: Refatorar DJ
  if (data) {
    data.map((item) => {
      categories.push(item.name ? item.name : 'Sem nome');
      // @ts-ignore
      barSeries[1].data.push(item.lost ? item.lost  * -1 : 0);
      // @ts-ignore
      barSeries[0].data.push(item.sales ?? 0);
    });
  }


  // ** Hooks & Var
  const theme = useTheme()

  const barOptions: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    colors: [hexToRGBA(theme.palette.primary.main, 1), hexToRGBA(theme.palette.warning.main, 1)],
    legend: {
      offsetY: -5,
      offsetX: -30,
      position: 'top',
      fontSize: '14px',
      horizontalAlign: 'left',
      fontFamily: theme.typography.fontFamily,
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 4,
        horizontal: 10
      },
      markers: {
        width: 12,
        height: 12,
        radius: 10,
        offsetY: 1,
        offsetX: theme.direction === 'ltr' ? -4 : 5
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '40%',
        borderRadiusWhenStacked: 'all',
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: { show: false }
      },
      padding: {
        left: -15,
        right: -10,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      categories: categories,
      labels: {
        style: {
          fontSize: '14px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          fontSize: '14px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          chart: { height: 341 },
          plotOptions: {
            bar: { columnWidth: '45%' }
          }
        }
      },
      {
        breakpoint: 1467,
        options: {
          chart: { height: 373 }
        }
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%' }
          }
        }
      },
      {
        breakpoint: 1290,
        options: {
          chart: { height: 421 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 321 },
          plotOptions: {
            bar: { columnWidth: '40%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 680,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%' }
          }
        }
      }
    ]
  }

  const lineOptions: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    stroke: {
      width: [1, 2],
      curve: 'smooth',
      dashArray: [5, 0]
    },
    colors: [theme.palette.divider, hexToRGBA(theme.palette.primary.main, 1)],
    grid: {
      padding: { top: -5 },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  return (
    <Card>
      <Grid container>
        <StyledGrid
          item
          sm={12}
          xs={12}
          sx={{
            '& .apexcharts-series[rel="1"]': { transform: 'translateY(-6px)' },
            '& .apexcharts-series[rel="2"]': { transform: 'translateY(-9px)' }
          }}
        >
          <CardHeader title='Conversão por funil de vendas' />
          <CardContent>
            <ReactApexcharts type='bar' height={330} width="100%" series={barSeries} options={barOptions} />
          </CardContent>
        </StyledGrid>
      </Grid>
    </Card>
  )
}

export default LeadConvert
