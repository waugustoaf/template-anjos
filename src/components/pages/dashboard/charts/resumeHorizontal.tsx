import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Icon } from '@/components/icon';

import { ThemeColor } from '@/types/app/layout';

import CustomAvatar from '@/@core/components/mui/avatar';
import { apiServices } from '@/services';
import { Autocomplete } from '@/components/form/autocomplete';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { DashboardFilterModal } from '../modals/filter';
import { ICampaign } from '@/types/entities/ICampaign';
import { IUser } from '@/types/entities/IUser';

interface DataType {
  icon: string;
  stats: string;
  title: string;
  color: ThemeColor;
}

interface ResumeHorizontalProps {
  leads?: number;
  sales?: number;
  ticket?: number;
  currentCampaign?: string | null;
  setCurrentCampaign?: (campaign: string) => void;
  filters: { campaignId: ICampaign | null; ownersIds: IUser[] };
  handleFilter: (props: {
    campaignId: ICampaign | null;
    ownersIds: IUser[];
  }) => void;
}

const renderStats = (data: DataType[]) => {
  return data.map((sale: DataType, index: number) => (
    <Grid item xs={6} md={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar
          skin='light'
          color={sale.color}
          sx={{ mr: 4, width: 42, height: 42 }}
        >
          <Icon icon={sale.icon} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>{sale.stats}</Typography>
          <Typography variant='body2'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const ResumeHorizontal = ({
  leads,
  sales,
  ticket,
  filters,
  handleFilter,
}: ResumeHorizontalProps) => {
  const [isFilterModalOpened, setIsFilterModalOpened] = useState(false);

  const data: DataType[] = [
    {
      color: 'info',
      stats: leads ? leads.toString() : '0',
      title: 'Leads',
      icon: 'tabler:users',
    },
    {
      color: 'error',
      stats: sales ? sales.toString() : '0',
      title: 'Vendas',
      icon: 'tabler:shopping-cart',
    },
    {
      stats: ticket
        ? ticket?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        : '0',
      color: 'success',
      title: 'Ticket Médio',
      icon: 'tabler:currency-dollar',
    },
  ];

  function handleOpenFilterModal() {
    setIsFilterModalOpened(true);
  }

  function handleCloseFilterModal() {
    setIsFilterModalOpened(false);
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Estatísticas'
          sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
          action={
            <IconButton
              color='inherit'
              aria-haspopup='true'
              onClick={handleOpenFilterModal}
            >
              <Icon
                fontSize='1.5rem'
                icon={
                  filters.ownersIds.length
                    ? 'flat-color-icons:empty-filter'
                    : 'tabler:filter'
                }
              />
            </IconButton>
          }
        />
        <CardContent sx={{ pt: (theme) => `${theme.spacing(7)} !important` }}>
          <Grid container spacing={6}>
            {renderStats(data)}
          </Grid>
        </CardContent>
      </Card>

      <DashboardFilterModal
        defaultValues={filters}
        isOpen={isFilterModalOpened}
        onClose={handleCloseFilterModal}
        onSubmit={handleFilter}
      />
    </>
  );
};

export default ResumeHorizontal;
