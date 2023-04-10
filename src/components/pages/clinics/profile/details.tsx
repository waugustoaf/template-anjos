import { IClinic } from '@/types/entities/IClinic';
import { beautifullyPhone } from '@/utils/text';
import { Box, Typography, Link } from '@mui/material';

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

      <Detail title='Nome Completo' value={clinic.name} />
      <Detail title='Nome Fantasia' value={clinic.fantasyName} />
      <Link href={'https://instagram.com/'+clinic.instagram} target='_blank'>
        <Detail title='Instagram' value={'@'+clinic.instagram} />
      </Link>
      <Detail title='Email' value={clinic.email} />
      <Link href={'https://whatsa.me/55'+clinic.phone} target='_blank'>
        <Detail title='Celular' value={beautifullyPhone(clinic.phone || '')} />
      </Link>
      <Detail title='Status do contrato' value={
        clinic.contractStatus === 'ACTIVE' ? 'ATIVO' :
          clinic.contractStatus === 'INACTIVE' ? 'INATIVO' :
            clinic.contractStatus === 'BLOCKED' ? 'Bloqueado' :
              clinic.contractStatus === 'GUIVENUP' ? 'Desistiu' : 'Expirou' } />
      <Detail title='Anjo' value={clinic?.userAttendance?.name} />
      <Detail title='Categoria' value={clinic?.category?.name} />
      <Detail title='Cidade' value={clinic.city} />
      <Detail title='Estado' value={clinic.state} />
      <Detail title='Plano de ação' />
    </Box>
  );
}
