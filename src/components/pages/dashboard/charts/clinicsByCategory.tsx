// ** MUI Imports
import Card from '@mui/material/Card'
import {useTheme} from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import {ApexOptions} from 'apexcharts'

// ** Component Import
import ReactApexcharts from '@/@core/components/react-apexcharts'

const donutColors = {
  escola: '#e6e600',
  blackPass: '#4d5166',
  black: '#000000',
  million: '#d2ae6d ',
  TIVE: '#ffa1a1'
}

const ClinicsByCategory = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    stroke: { width: 1 },
    labels: ['Escola Anjos Business', 'Black Pass', 'Mentoria Black', 'Millions', 'TIVE'],
    colors: [donutColors.escola, donutColors.blackPass, donutColors.black, donutColors.million, donutColors.TIVE],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Operational',
              formatter: () => '31%',
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Clínicas'
        subheader='Clínicas por catgoria'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts type='donut' height={400} options={options} series={[100, 20, 10, 25, 25]} />
      </CardContent>
    </Card>
  )
}

export default ClinicsByCategory
