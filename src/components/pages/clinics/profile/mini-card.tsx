import { Icon } from '@/components/icon';
import { IClinic } from '@/types/entities/IClinic';
import { nFormatter } from '@/utils/functions/formatters';
import { Box, Typography } from '@mui/material';

interface ClinicProfileMiniCardProps {
  icon: string;
  number: number;
  title: string;
}

export function ClinicProfileMiniCard({
  icon,
  number,
  title,
}: ClinicProfileMiniCardProps) {
  return (
    <Box display='flex' gap='0.5rem' alignItems='stretch'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='38px'
        height='38px'
        borderRadius='6px'
        bgcolor='customColors.tableHeaderBg'
        color='primary.main'
      >
        <Icon icon={icon} fontSize={18} />
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        flex={1}
        flexDirection='column'
      >
        <Typography fontWeight='bold' fontSize='15px'>
          {nFormatter(number, 1)}
        </Typography>
        <Typography fontSize='12px' color='text.secondary'>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
