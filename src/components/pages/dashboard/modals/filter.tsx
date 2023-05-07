import { apiServices } from '@/services';
import { ICampaign } from '@/types/entities/ICampaign';
import { IUser } from '@/types/entities/IUser';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface DashboardFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (props: {
    campaignId: ICampaign | null;
    ownersIds: IUser[];
  }) => void;
  defaultValues: {
    campaignId: ICampaign | null;
    ownersIds: IUser[];
  };
}

export function DashboardFilterModal({
  isOpen,
  onClose,
  defaultValues,
  onSubmit,
}: DashboardFilterModalProps) {
  const [campaignId, setCampaignId] = useState(defaultValues.campaignId);
  const [ownersIds, setOwnersIds] = useState(defaultValues.ownersIds);

  const { data: owners } = useQuery(['owners', defaultValues], () =>
    apiServices.user.getOwners(),
  );

  const { data: campaigns } = useQuery(['campaign', defaultValues], () =>
    apiServices.campaign.list(),
  );

  function handleSubmit() {
    onSubmit({
      campaignId,
      ownersIds,
    });
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Filtro de dashboard</DialogTitle>

      <DialogContent sx={{ minWidth: { sx: undefined, sm: '28rem' } }}>
        <Autocomplete
          fullWidth
          options={campaigns?.data || []}
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Campanha'
              placeholder='Campanha'
            />
          )}
          getOptionLabel={(option) => option.campaign}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={campaignId}
          onChange={(_, value) => setCampaignId(value)}
        />

        <Autocomplete
          fullWidth
          options={owners?.data || ([] as IUser[])}
          multiple
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Dono do Lead'
              placeholder='Dono do lead'
            />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={ownersIds}
          onChange={(_, value) => setOwnersIds(value)}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: '1.5rem 0 0.5rem',
          }}
        >
          <Button type='button' variant='contained' onClick={handleSubmit}>
            Aplicar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
