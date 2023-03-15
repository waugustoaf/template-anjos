import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { apiServices } from '@/services';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { ICustomer } from '@/types/entities/ICustomer';
import { createCustomerListTable } from '@/utils/tables/customers/list';
import { Pagination } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

const InvoiceList = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['customers', debouncedSearch, page],
    queryFn: () =>
      apiServices.customers.list({
        search: debouncedSearch,
        page,
      }),
  });

  const [customerToDelete, setCustomerToDelete] = useState<ICustomer | null>(
    null,
  );

  async function handleDeleteCustomer() {
    try {
      if (!customerToDelete) return;

      await apiServices.customers.delete(customerToDelete.id);

      toast('Cliente apagado com sucesso.', { icon: '🚀' });
      refetch();
    } catch {
      toast('Erro ao apagar o cliente.', { icon: '🚨' });
    } finally {
      setCustomerToDelete(null);
    }
  }

  const columns = createCustomerListTable({
    customerToDelete,
    setCustomerToDelete,
    handleDeleteCustomer,
  });

  if (isLoading) return <Spinner />;

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              search={search}
              onSearch={setSearch}
              inputPlaceholder='Buscar cliente'
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
                noRowsLabel: 'Nenhum cliente encontrado',
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
};

export default InvoiceList;
