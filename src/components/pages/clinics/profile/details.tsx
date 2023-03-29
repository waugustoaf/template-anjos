import { IClinic } from '@/types/entities/IClinic';
import { beautifullyPhone } from '@/utils/text';
import { Box, Typography } from '@mui/material';

function Detail({ title, value }: { title: string; value?: string }) {
  return (
    <Typography
      fontSize='15px'
      fontFamily="'Public Sans'"
      lineHeight='22px'
      marginTop='12px'
    >
      <strong>{title}:&nbsp;</strong>
      {value || 'Não informado'}
    </Typography>
  );
}

export function ClinicProfileDetails({ clinic }: { clinic: Partial<IClinic> }) {
  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      marginTop='2rem'
    >
      <Box bgcolor='#ccc' height='1px' width='100%' />
      <Typography fontSize='14px' marginTop='2rem' marginBottom='4px'>
        DETALHES
      </Typography>
      <Detail title='Nome Completo' value={clinic.name} />
      <Detail title='Nome Fantasia' value={clinic.fantasyName} />
      <Detail title='Email' value={clinic.email} />
      <Detail title='Celular' value={beautifullyPhone(clinic.phone || '')} />
      <Detail title='Status' value={clinic.status} />
      <Detail title='Anjo' value={clinic?.userAttendance?.name} />
      <Detail title='Categoria' value={clinic?.category?.name} />
      <Detail title='Cidade' value={clinic.city} />
      <Detail title='Estado' value={clinic.state} />
      <Detail title='Plano de ação' />
    </Box>
  );
}
