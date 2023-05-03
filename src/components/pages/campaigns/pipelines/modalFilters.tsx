import { customerFormFields } from '@/forms/customer';
import { apiServices } from '@/services';
import { IStrategy } from '@/types/entities/IStrategy';
import { mountForm } from '@/utils/form/mount-form';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface PipelineFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (props: {
    name: string;
    strategyId: IStrategy[];
    onlyMy: boolean;
  }) => void;
  defaultValues: {
    name: string;
    strategyId: IStrategy[];
    onlyMy: boolean;
  };
}

export function PipelineFilterModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: PipelineFilterModalProps) {
  const [name, setName] = useState(defaultValues.name);
  const [strategyId, setStrategyId] = useState(defaultValues.strategyId);
  const [onlyMy, setOnlyMy] = useState(defaultValues.onlyMy);

  const { data } = useQuery(['strategies'], () => apiServices.strategy.full());

  function handleSubmit() {
    onSubmit({
      name,
      strategyId,
      onlyMy,
    });
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Filtros do quadro</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            handleSubmit();
          }}
        >
          <TextField
            fullWidth
            placeholder='João da Silva'
            title='Nome do cliente'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Autocomplete
            fullWidth
            options={data?.data || []}
            multiple
            renderInput={(props: any) => (
              <TextField
                {...props}
                fullWidth
                title='Estratégias'
                placeholder='Estratégias'
              />
            )}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ marginTop: '0.5rem' }}
            value={strategyId}
            onChange={(_, value) => setStrategyId(value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={onlyMy}
                onChange={(event) => setOnlyMy(event.target.checked)}
              />
            }
            label='Somente meus clientes'
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              margin: '1.5rem 0 0.5rem',
            }}
          >
            <Button type='submit' variant='contained'>
              Aplicar
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
