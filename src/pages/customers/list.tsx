import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { apiServices } from '@/services';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';
import { createSalesFunnelListTable } from '@/utils/tables/sales-funnel/list';
import { Pagination } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { Breadcrumb } from '@/components/breadcrumb';
import {ICustomer} from "@/types/entities/ICustomer";
import {createCustomerListTable} from "@/utils/tables/customer/list";
import {CustomerModal} from "@/components/pages/customer/customer-modal";

export default function SalesListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddModalOpen, setIsAddModalOpen] =
    useState<boolean>(false);
  const [customerToEdit, setCustomerToEdit] =
    useState<ICustomer | null>(null);
  const [customerToDelete, setCustomerToDelete] =
    useState<ICustomer | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['sales-funnel', debouncedSearch, page],
    queryFn: () =>
      apiServices.customer.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteCustomer() {
    try {
      if (!customerToDelete) return;

      await apiServices.customer.delete(customerToDelete.id);

      toast.success('Cliente apagado com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar o cliente.');
    } finally {
      setCustomerToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createCustomerListTable({
      customerToDelete,
      setCustomerToDelete,
      handleDeleteCustomer,
      setCustomerToEdit,
    });
  }, [customerToDelete, setCustomerToDelete, setCustomerToEdit]);

  function handleAdd() {
    setIsAddModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddModalOpen(false);
    setCustomerToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Clientes' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar Cliente'
                addOnClick={handleAdd}
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

      <CustomerModal
        isOpen={isAddModalOpen || !!customerToEdit}
        onClose={handleCloseModal}
        defaultCustomer={customerToEdit}
        refetch={refetch}
      />
    </>
  );
}
