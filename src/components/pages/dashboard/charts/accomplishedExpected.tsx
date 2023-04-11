// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import { Icon } from '@/components/icon';

// ** Component Import
import ReactApexcharts from '@/@core/components/react-apexcharts'
import Typography from "@mui/material/Typography";
import {hexToRGBA} from "@/@core/utils/hex-to-rgba";

interface PickerProps {
  start: Date | number
  end: Date | number
}

const series = [
  {
    name: 'Realizado',
    data: [90, 120, 55, 100, 80]
  },
  {
    name: 'Esperado',
    data: [85, 180, 30, 40, 95]
  }
]

const AccomplishedExpected = () => {
  // ** Hook
  const theme = useTheme()

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
    dataLabels: { enabled: false },
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
      categories: ['Mensagens', 'Conversas', 'Agendamentos', 'Consultas', 'Vendas'],
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
