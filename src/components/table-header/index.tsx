import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Icon } from '../icon';

interface TableHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  refetch?: (data?: any) => any;
  inputPlaceholder: string;
  addLink: string;
}

export const TableHeader = (props: TableHeaderProps) => {
  const { search, onSearch, inputPlaceholder, addLink } = props;

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        size='small'
        value={search}
        sx={{ mr: 4, mb: 2 }}
        placeholder={inputPlaceholder}
        onChange={(e) => onSearch(e.target.value)}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          sx={{ mb: 2 }}
          component={Link}
          variant='contained'
          href={addLink}
        >
          <Icon
            icon='tabler:plus'
            fontSize={18}
            style={{ marginRight: '0.5rem' }}
          />
          Adicionar
        </Button>
      </Box>
    </Box>
  );
};
