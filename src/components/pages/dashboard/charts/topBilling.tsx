// ** React Imports
import {useState} from 'react'

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

type TabCategory = 'Financial'

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

interface DataTopBillingProps {
  data: TopBillingProps[] | undefined
}

interface TopBillingProps {
  clinicId?: string;
  clinicName?: string;
  financialResult?: number;
  clinicAvatar?: string;
}

const TopBilling = ({data}: DataTopBillingProps) => {


  const [value, setValue] = useState<TabCategory>('Financial')

  const theme = useTheme()

  const namesList: string[] = []

  const tabData: TabType[] = [
    {
      type: 'Financial',
      series: [{ data: [] }]
    },
  ]

  data?.forEach((item) => {
    namesList.push(item.clinicName as string);

    // @ts-ignore
    tabData[0].series[0].data?.push(item.financialResult as number);
  });

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
      categories: namesList,
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
        title='Top 10 Faturamento'
        subheader='Clínicas com maior faturamento'
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

export default TopBilling
