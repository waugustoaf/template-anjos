import { Box, Button, ButtonProps, CircularProgress } from '@mui/material';
import { Icon } from '../icon';

interface SubmitButtonProps extends ButtonProps {
  isLoading: boolean;
  title: string;
  hideCustomSpace?: boolean;
  icon?: string;
}

export function SubmitButton({
  isLoading,
  title,
  hideCustomSpace,
  icon = 'tabler:plus',
  ...rest
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
        {...rest}
      >
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <Icon fontSize='1.125rem' icon={icon} />
            {title}
          </>
        )}
      </Button>
    </Box>
  );
}
