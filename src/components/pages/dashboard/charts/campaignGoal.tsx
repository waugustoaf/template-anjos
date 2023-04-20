// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Import
import ReactApexcharts from '@/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

interface CampaignGoalProps {
  goal: number | undefined
  endMonthDays: number | undefined;
}

const CampaignGoal = ({goal, endMonthDays}: CampaignGoalProps) => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(theme.palette.warning.main, 1)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '64%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -3,
            fontWeight: 600,
            fontSize: '22px',
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: 15
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 200 }
        }
      },
      {
        breakpoint: 430,
        options: {
          chart: { height: 150 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Meta da campanha</Typography>
        <ReactApexcharts type='radialBar' height={160} width="100%" series={[goal ? goal : 0]} options={options} />
        <Typography variant='body2' sx={{ textAlign: 'center', color: 'text.disabled' }}>
          Faltam {endMonthDays ? endMonthDays : 0} dias para o fim do mês
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CampaignGoal
