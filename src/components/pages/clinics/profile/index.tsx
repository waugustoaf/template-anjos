import { apiServices } from '@/services';
import { IClinic } from '@/types/entities/IClinic';
import { Box, Input, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import { ClinicProfileDays } from './days';
import { ClinicProfileDetails } from './details';
import { ClinicProfileImage } from './image';
import { ClinicProfileMiniCard } from './mini-card';

interface ClinicProfileProps {
  clinic: Partial<IClinic>;
  refetch: () => void;
}

export function ClinicProfile({ clinic, refetch }: ClinicProfileProps) {
  return (
    <Box
      height='fit-content'
      width='100%'
      maxWidth={{ xs: '100%', md: '360px' }}
      bgcolor='background.paper'
      padding='1rem'
      display='flex'
      flexDirection='column'
      alignItems='center'
      borderRadius='6px'
    >
      <ClinicProfileImage clinic={clinic} refetch={refetch} />

      <Typography
        variant='h2'
        fontWeight='bold'
        fontSize='22px !important'
        lineHeight='30px'
        marginTop='1rem'
        textAlign='center'
        fontFamily="'Public Sans' !important"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {clinic.name}
      </Typography>

      {clinic?.category && (
        <Box
          padding='2px 8px'
          bgcolor='rgba(168, 170, 174, 0.16)'
          borderRadius='4px'
          fontSize='13px'
          fontWeight='600'
          marginTop='1rem'
        >
          {clinic.category.name}
        </Box>
      )}

      <Box marginTop='2rem' display='flex' gap='1.5rem'>
        <ClinicProfileMiniCard
          icon='tabler:checkbox'
          number={clinic.leads || 0}
          title='Leads'
        />
        <ClinicProfileMiniCard
          icon='tabler:briefcase'
          number={clinic.campaigns || 0}
          title='Finalizados'
        />
      </Box>

      <ClinicProfileDetails clinic={clinic} />

      <ClinicProfileDays clinic={clinic} />
    </Box>
  );
}
