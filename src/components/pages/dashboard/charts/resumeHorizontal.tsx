// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import { Icon } from '@/components/icon';

// ** Types
import { ThemeColor } from '@/types/app/layout';

// ** Custom Components Imports
import CustomAvatar from '@/@core/components/mui/avatar'

interface DataType {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

const data: DataType[] = [
  {
    color: 'info',
    stats: '2.500',
    title: 'Leads',
    icon: 'tabler:users'
  },
  {
    color: 'error',
    stats: '350',
    title: 'Vendas',
    icon: 'tabler:shopping-cart'
  },
  {
    stats: 'R$ 3.400,00',
    color: 'success',
    title: 'Ticket Médio',
    icon: 'tabler:currency-dollar'
  }
]

const renderStats = () => {
  return data.map((sale: DataType, index: number) => (
    <Grid item xs={6} md={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>{sale.stats}</Typography>
          <Typography variant='body2'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const ResumeHorizontal = () => {
  return (
    <Card>
      <CardHeader
        title='Estatísticas'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            Campanha Atual
          </Typography>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(7)} !important` }}>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ResumeHorizontal
