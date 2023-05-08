// ** React Imports
// ** MUI Imports
import Card from '@mui/material/Card'
import {useTheme} from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import {ApexOptions} from 'apexcharts'

// ** Icon Imports

// ** Component Import
import ReactApexcharts from '@/@core/components/react-apexcharts'
import Typography from "@mui/material/Typography";
import {hexToRGBA} from "@/@core/utils/hex-to-rgba";

interface DataGoalAccomplishedProps {
  data: AccomplishedExpectedProps[] | undefined
}

interface AccomplishedExpectedProps {
  name: string | undefined
  goal: number | undefined;
  quantity: number | undefined;
}

const AccomplishedExpected = ({data}: DataGoalAccomplishedProps) => {
  // ** Hook
  const theme = useTheme()

  const series = [
    {
      name: 'Realizado',
      data: []
    },
    {
      name: 'Esperado',
      data: []
    }
  ]

  const categories: string[] = []

  data?.map((item) => {
    // @ts-ignore
    series[0].data.push(item.quantity ? item.quantity : 0);
    // @ts-ignore
    series[1].data.push(item.goal ? item.goal : 0);
    categories.push(item.name ? item.name : '');
  });



  const columnColors = {
    bg: hexToRGBA(theme.palette.primary.main, 0.2),
    series1: hexToRGBA(theme.palette.primary.main, 0.9),
    series2: hexToRGBA(theme.palette.primary.main, 0.5)
  }

  const options: ApexOptions = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: true },
    colors: [columnColors.series1, columnColors.series2],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg]
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: categories,
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ fontWeight: 500 }}>
          Guia em tempo real
        </Typography>
        <ReactApexcharts type='bar' height={400} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default AccomplishedExpected
