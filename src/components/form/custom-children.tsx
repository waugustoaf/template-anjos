import { ResolveFieldProps } from '@/utils/form/mount-form';
import { Grid } from '@mui/material';

export function CustomChildren(props: ResolveFieldProps) {
  const { field } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      {field.children}
    </Grid>
  );
}
