import { apiServices } from '@/services';
import { createClinicCampaignListTable } from '@/utils/tables/clinics/campaigns/list';
import { Card, Grid, Pagination } from '@mui/material';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function ClinicTabCampaign({ clinicId }: { clinicId: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isRefetching } = useQuery(
    ['clinic-campaign', clinicId],
    () =>
      apiServices.clinics.getCampaigns(clinicId, {
        page: currentPage,
      }),
  );

  const columns = createClinicCampaignListTable();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <DataGrid
            autoHeight
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            rowHeight={62}
            rows={data?.data.data ?? []}
            columns={columns}
            loading={isRefetching}
            getRowId={row => `${row.month}/${row.year}`}
            localeText={{
              ...ptBR.components.MuiDataGrid.defaultProps.localeText,
              noRowsLabel: 'Nenhuma clínica encontrado',
            }}
          />
          <Pagination
            page={currentPage}
            count={data?.data?.info?.totalPages ?? 1}
            onChange={(_, _page) => setCurrentPage(_page)}
            shape='rounded'
            style={{
              padding: '1rem',
              width: 'fit-content',
              margin: '0 auto',
            }}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
