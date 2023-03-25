import { Box, Button, CircularProgress } from '@mui/material';
import { Icon } from '../icon';

interface SubmitButtonProps {
  isLoading: boolean;
  title: string;
  hideCustomSpace?: boolean;
}

export function SubmitButton({
  isLoading,
  title,
  hideCustomSpace,
}: SubmitButtonProps) {
  return (
    <Box
      display='flex'
      {...(hideCustomSpace
        ? {}
        : { justifyContent: 'flex-end', width: '100%' })}
    >
      <Button
        variant='contained'
        sx={{
          '& svg': isLoading ? undefined : { mr: 2 },
          mt: hideCustomSpace ? 0 : '2rem',
        }}
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            {title}
          </>
        )}
      </Button>
    </Box>
  );
}
