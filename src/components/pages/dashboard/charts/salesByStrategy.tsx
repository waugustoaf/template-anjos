// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Theme, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Import
import { Icon } from '@/components/icon';
import CustomAvatar from '@/@core/components/mui/avatar'
import ReactApexcharts from '@/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

type ApexChartSeries = NonNullable<ApexOptions['series']>
type ApexChartSeriesData = Exclude<ApexChartSeries[0], number>

type TabCategory = 'Tráfego Pago' | 'Indicação' | 'Tráfego Alheio' | 'Lista Quente'

type TabType = {
  type: TabCategory
  series: ApexChartSeries
}

const renderTabPanels = (tabData:TabType[],  value: TabCategory, theme: Theme, options: ApexOptions, colors: string[]) => {
  return tabData.map((item, index) => {
    const max = Math.max(...((item.series[0] as ApexChartSeriesData).data as number[]))
    const seriesIndex = ((item.series[0] as ApexChartSeriesData).data as number[]).indexOf(max)

    const finalColors = colors.map((color, i) => (
      seriesIndex === i ?
      hexToRGBA(theme.palette.primary.main, 1) :
      hexToRGBA(theme.palette.primary.main, 1)))

    return (
      <TabPanel key={index} value={item.type}>
        <ReactApexcharts type='bar' height={258} width="100%" options={{ ...options, colors: finalColors }} series={item.series} />
      </TabPanel>
    )
  })
}

interface DataSalesByStrategiesProps {
  data: SalesByStrategiesProps[] | undefined
}

interface SalesByStrategiesProps {
  strategyId: string | undefined
  icon: string | undefined
  name: string | undefined
  value: number | undefined;
}

const SalesByStrategy = ({data}: DataSalesByStrategiesProps) => {

  const strategies: string[] = ['Estratégia2222', 'Estratégia 2', 'Estratégia 3', 'Estratégia 4']

  const tabData: TabType[] = [
    {
      type: 'Tráfego Pago',
      series: [{ data: [28, 10, 45, 38] }]
    },
    {
      type: 'Indicação',
      series: [{ data: [35.3, 25, 15, 40] }]
    },
    {
      type: 'Tráfego Alheio',
      series: [{ data: [10, 22, 27, 33] }]
    },
    {
      type: 'Lista Quente',
      series: [{ data: [5, 9, 12, 18] }]
    }
  ]

  // ** State
  const [value, setValue] = useState<TabCategory>('Indicação')

  // ** Hook
  const theme = useTheme()

  const handleChange = (event: SyntheticEvent, newValue: TabCategory) => {
    setValue(newValue)
  }

  const colors = Array(9).fill(hexToRGBA(theme.palette.primary.main, 0.16))

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '35%',
        borderRadiusWhenStacked: 'all',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -15,
      formatter: val => `${val}k`,
      style: {
        fontWeight: 500,
        fontSize: '1rem',
        colors: [theme.palette.text.secondary]
      }
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: 20,
        left: -5,
        right: -8,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: theme.palette.divider },
      categories: strategies,
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
        formatter: val => `$${val}k`,
        style: {
          fontSize: '14px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          },
          grid: {
            padding: { right: 20 }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Vendas por estratégia'
        subheader='Acompanhamento das vendas por estratégia'
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <CardContent sx={{ '& .MuiTabPanel-root': { p: 0 } }}>
        <TabContext value={value}>
          {renderTabPanels(tabData, value, theme, options, colors)}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default SalesByStrategy
