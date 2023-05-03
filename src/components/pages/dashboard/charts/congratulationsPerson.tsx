import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110,
  },
}));

interface CongratulationsPersonProps {
  value: number | undefined;
  percentage: number | undefined;
  campaignStatus: string | undefined;
}

const CongratulationsPerson = ({
  percentage,
  value,
  campaignStatus
}: CongratulationsPersonProps) => {
  // @ts-ignore
  return (
    <Card sx={{ position: 'relative' }} style={{ minHeight: '100%' }}>
      <CardContent>

        {campaignStatus === 'onTime' && (
          <>
            <Typography variant='h6' sx={{ fontWeight: 500 }}>
              Parabéns !  🎉
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              ESTAMOS VOANDO!!! 🚀
            </Typography>
          </>
        )}
        {campaignStatus === 'onLate' && (
          <>
            <Typography variant='h6' sx={{ fontWeight: 500 }}>
             ️Estamos atrasados! 😱
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }} maxWidth={240}>
              MULHER, VAMOS ANDAR COM A META PELO AMOR DE DEUS!
            </Typography>
          </>
        )}

        <Typography
          variant='h5'
          sx={{ mb: 0.5, fontWeight: 500, color: 'primary.main' }}
        >
          {value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} -
          {percentage}%
        </Typography>


        {campaignStatus === 'onTime' && (
          <Illustration
            width={116}
            alt='congratulations'
            src='/images/cards/congratulations-OnTimeGain.png'
          />
        )}

        {campaignStatus === 'onLate' && (
          <Illustration
            width={116}
            alt='congratulations'
            src='/images/cards/congratulations_OnLate.png'
          />
        )}

      </CardContent>
    </Card>
  );
};

export default CongratulationsPerson;
