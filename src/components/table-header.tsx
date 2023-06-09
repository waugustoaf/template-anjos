import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Icon } from './icon';

interface TableHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  refetch?: (data?: any) => any;
  inputPlaceholder?: string;
  addLink?: string;
  addOnClick?: () => void;
  rightChildren?: React.ReactNode;
  leftChildren?: React.ReactNode;
}

export const TableHeader = (props: TableHeaderProps) => {
  const {
    search,
    onSearch,
    inputPlaceholder,
    addLink,
    addOnClick,
    rightChildren,
    leftChildren,
  } = props;

  const addProps = addLink ? { component: Link, href: addLink } : {};

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
      <Box display='flex' alignItems='center'>
        {inputPlaceholder && (
          <TextField
            size='small'
            value={search}
            sx={{ mr: 4, mb: 2 }}
            placeholder={inputPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
          />
        )}

        {leftChildren && <>{leftChildren}</>}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
          mb: 2,
        }}
      >
        <Button variant='contained' onClick={addOnClick} {...addProps}>
          <Icon
            icon='tabler:plus'
            fontSize={18}
            style={{ marginRight: '0.5rem' }}
          />
          Adicionar
        </Button>

        {rightChildren ? rightChildren : null}
      </Box>
    </Box>
  );
};
