import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { apiServices } from '@/services';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { Breadcrumbs, Pagination } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { IClinic } from '@/types/entities/IClinic';
import { Breadcrumb } from '@/components/breadcrumb';
import { createClinicListTable } from '@/utils/tables/clinics/list';
import {
  ClinicHeaderFilters,
  ClinicHeaderFiltersProps,
} from '@/components/pages/clinics/header-filters';

export default function ClinicListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [clinicToDelete, setClinicToDelete] = useState<IClinic | null>(null);
  const [filters, setFilters] = useState<ClinicHeaderFiltersProps>({
    category: '',
    planStatus: '',
    status: '',
  });

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['clinics', debouncedSearch, page],
    queryFn: () =>
      apiServices.clinics.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteClinic() {
    try {
      if (!clinicToDelete) return;

      await apiServices.clinics.delete(clinicToDelete.id);

      toast.success('Clínica apagada com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar a clínica.');
    } finally {
      setClinicToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createClinicListTable({
      clinicToDelete,
      setClinicToDelete,
      handleDeleteClinic,
    });
  }, [clinicToDelete, setClinicToDelete, handleDeleteClinic]);

  if (isLoading) return <Spinner />;

  return (
    <DatePickerWrapper>
      <Breadcrumb
        items={[{ label: 'Anjos', link: '/' }, { label: 'Clínicas' }]}
      />

      <Grid container spacing={6}>
        <Grid item xs={12} className='page-card-mui'>
          <Card>
            <ClinicHeaderFilters filters={filters} setFilters={setFilters} />
            <TableHeader
              search={search}
              onSearch={setSearch}
              inputPlaceholder='Buscar clínica'
              addLink='/clinics/add'
            />
            <DataGrid
              autoHeight
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              rowHeight={62}
              rows={data?.data ?? []}
              columns={columns}
              loading={isRefetching}
              localeText={{
                ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                noRowsLabel: 'Nenhuma clínica encontrado',
              }}
            />
            <Pagination
              page={page}
              count={data?.info?.totalPages ?? 1}
              onChange={(_, _page) => setPage(_page)}
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
    </DatePickerWrapper>
  );
}
