import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {minHeight} from "@mui/system";

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const ContratulationsPerson = () => {
  return (
    <Card sx={{ position: 'relative' }} style={{minHeight:'100%'}}>
      <CardContent>
        <Typography variant='h6' sx={{ fontWeight: 500 }}>
          Parabéns Anjo! 🎉
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>Best seller of the month</Typography>
        <Typography variant='h5' sx={{ mb: 0.5, fontWeight: 500, color: 'primary.main' }}>
          53,000 - 103.3%
        </Typography>

        <Illustration width={116}  alt='congratulations john' src='/images/cards/congratulations.png' />
      </CardContent>
    </Card>
  )
}

export default ContratulationsPerson
