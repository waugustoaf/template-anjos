import { useAuth } from '@/hooks/useAuth';
import { apiServices } from '@/services';
import { TextEllipsis } from '@/utils/text';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

interface Props {
  onClose: () => void;
}

export const AppBarContentClinic = ({ onClose }: Props) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 750);

  const { handleUpdateToken, handleUpdateUser } = useAuth();

  const { data, isLoading, isRefetching } = useQuery(
    ['clinics', debouncedSearch],
    () =>
      apiServices.clinics.list({
        search: debouncedSearch,
        page: 1,
        take: 100,
      }),
  );

  async function handleSelectClinic(clinicId: string) {
    try {
      const response = await apiServices.auth.updateClinic(clinicId);

      handleUpdateToken(response.data.token);
      handleUpdateUser({
        user: response.data.user,
        clinic: response.data.clinic,
      });
      onClose();
    } catch {
      toast.error('Não foi possível selecionar a clínica');
    }
  }

  return (
    <Box minWidth={{ sx: undefined, md: '500px' }} height='fit-content'>
      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Buscar clínicas'
        sx={{ marginBottom: '1rem', width: '100%' }}
      />

      {isRefetching || isLoading ? (
        <Box display='flex' justifyContent='center' width='100%'>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <>
          <Box
            maxHeight='60vh'
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='stretch'
            sx={{ overflowY: 'auto' }}
          >
            {data?.data.map((clinic) => (
              <Button
                key={clinic.id}
                variant='text'
                onClick={() => handleSelectClinic(clinic.id)}
                sx={{
                  padding: '0.15rem',
                  margin: '0.25rem 0',
                  display: 'flex',
                  gap: '0.5rem',
                  borderRadius: '6px',
                }}
              >
                <Avatar
                  alt={clinic.fantasyName}
                  src={clinic.avatar || undefined}
                >
                  <Typography fontSize={12}>
                    {clinic.fantasyName.split(' ').map((word) => word[0])}
                  </Typography>
                </Avatar>

                <Typography flex={1} textAlign='left'>
                  {TextEllipsis(clinic.fantasyName, 40)}
                </Typography>
              </Button>
            ))}
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            marginTop='1rem'
          >
            <Typography fontSize={12} color='text.secondary'>
              Mostrando {data?.data.length || 0} resultados
            </Typography>

            <Button variant='text' onClick={onClose}>
              Cancelar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
