// ** React Imports
import {SyntheticEvent, useState} from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {Theme, useTheme} from '@mui/material/styles'

// ** Third Party Imports
import {ApexOptions} from 'apexcharts'

// ** Custom Components Import
import ReactApexcharts from '@/@core/components/react-apexcharts'

// ** Util Import
import {hexToRGBA} from '@/@core/utils/hex-to-rgba'

type ApexChartSeries = NonNullable<ApexOptions['series']>
type ApexChartSeriesData = Exclude<ApexChartSeries[0], number>

type TabCategory = 'TrafegoPago' | 'Indicacao' | 'TrafegoAlheio' | 'ListaQuente'

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
  strategyId: string
  icon: string
  name: string
  value: number;
}

const SalesByFunnel = ({data}: DataSalesByStrategiesProps) => {


  const [value, setValue] = useState<TabCategory>('TrafegoPago')

  const theme = useTheme()

  if (!data) return (<></>);

  const strategies: string[] = []


  const tabData: TabType[] = [
    {
      type: 'TrafegoPago',
      series: [{ data: [] }]
    },
    {
      type: 'Indicacao',
      series: [{ data: [] }]
    },
    {
      type: 'TrafegoAlheio',
      series: [{ data: [] }]
    },
    {
      type: 'ListaQuente',
      series: [{ data: [] }]
    }
  ]

  for (let i = 0; i < data.length; i++) {
    strategies.push(data[i].name as string)
    // @ts-ignore
    if (!(tabData[0].series[0] && tabData[0].series[0].data)) {
      continue;
    }
    // @ts-ignore
    tabData[0].series[0].data?.push(data[i].value / 100000)
  }

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
        formatter: val => `R$ ${val.toFixed(1)}k`,
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
        title='Vendas por funil'
        subheader='Acompanhamento das vendas por funil'
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

export default SalesByFunnel
