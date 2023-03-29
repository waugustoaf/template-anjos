import { Box, useTheme } from '@mui/material';
import { useMemo } from 'react';

interface ProgressDivProps {
  value?: number;
  max?: number;
  color?: string;
  rawPercentage?: number;
}

export function ProgressDiv({
  max,
  value,
  color,
  rawPercentage,
}: ProgressDivProps) {
  const theme = useTheme();

  const percentage = useMemo(() => {
    if (rawPercentage) {
      return rawPercentage;
    }

    if (value === 0) {
      return 0;
    }

    const returnValue = ((value || 0) / (max || 0)) * 100;

    return returnValue > 100 ? 100 : returnValue;
  }, []);

  return (
    <Box
      bgcolor='rgba(134, 146, 208, 0.08)'
      height='10px'
      width='100%'
      borderRadius='30px'
      boxShadow='0px 2px 4px rgba(15, 20, 34, 0.4)'
    >
      <Box
        width={`${percentage > 100 ? 100 : percentage}%`}
        height='100%'
        bgcolor={color || theme.palette.primary.main}
        borderRadius='30px'
      />
    </Box>
  );
}
