import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
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
}

const CongratulationsPerson = ({
  percentage,
  value,
}: CongratulationsPersonProps) => {
  // @ts-ignore
  return (
    <Card sx={{ position: 'relative' }} style={{ minHeight: '100%' }}>
      <CardContent>
        <Typography variant='h6' sx={{ fontWeight: 500 }}>

          Parabéns Anjo! 🎉
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
          {percentage ?
            percentage < 30 ? ('Você pode melhorar') :
            percentage > 30 && percentage < 50 ? ('Quem trabalha sempre alcança') :
              percentage > 50 && percentage < 80 ? ('Estamos no caminho  !') :
                percentage > 80 && percentage < 100 ? ('quase lá !') :
                  percentage == 100 ? ('Parabéns Conseguimos') :
                    percentage > 100 ? ('Isso é fenomenal !') :
              ('Vamos Vamos !') :
            ''}
        </Typography>
        <Typography
          variant='h5'
          sx={{ mb: 0.5, fontWeight: 500, color: 'primary.main' }}
        >
          {value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} -
          {percentage}%
        </Typography>

        <Illustration
          width={116}
          alt='congratulations john'
          src='/images/cards/congratulations.png'
        />
      </CardContent>
    </Card>
  );
};

export default CongratulationsPerson;
