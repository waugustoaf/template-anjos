import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { apiServices } from '@/services';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { IconButton, Pagination, useMediaQuery } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { Breadcrumb } from '@/components/breadcrumb';
import { ICustomer } from '@/types/entities/ICustomer';
import { createCustomerListTable } from '@/utils/tables/customer/list';
import { CustomerModal } from '@/components/pages/customer/customer-modal';
import {
  CustomerFiltersModal,
  CustomerFiltersProps,
} from '@/components/pages/customer/filters-modal';
import { Icon } from '@/components/icon';

export default function SalesListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [customerToEdit, setCustomerToEdit] = useState<ICustomer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<ICustomer | null>(
    null,
  );
  const [isFiltersModalOpened, setIsFiltersModalOpened] = useState(false);
  const [filters, setFilters] = useState<CustomerFiltersProps>(() => {
    const savedData = localStorage.getItem(
      '@anjosguia:dashboard:customer-filters',
    );

    const defaultData = {
      actions: '',
      status: '',
      currentStep: '',
      origin: '',
      entryStrategyIds: [],
      saleStrategyIds: [],
      owners: [],
      tags: [],
    };

    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const hasFirstRenderHappens = useRef(false);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['sales-funnel', debouncedSearch, page, filters],
    queryFn: () =>
      apiServices.customer.list(
        {
          search: debouncedSearch,
          page,
        },
        filters,
      ),
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

  const [mobileColumns, desktopColumns, actionColumn] = useMemo(() => {
    const [mc, dc, ac] = createCustomerListTable({
      customerToDelete,
      setCustomerToDelete,
      handleDeleteCustomer,
      setCustomerToEdit,
    });

    return [mc, [...mc, ...dc], ac];
  }, [customerToDelete, setCustomerToDelete, setCustomerToEdit]);

  function handleAdd() {
    setIsAddModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddModalOpen(false);
    setCustomerToEdit(null);
  }

  const matches = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const columns = [
    ...(matches ? mobileColumns : desktopColumns),
    ...actionColumn,
  ];

  function handleSubmitFilters(filters: CustomerFiltersProps) {
    localStorage.setItem(
      '@anjosguia:dashboard:customer-filters',
      JSON.stringify(filters),
    );
    setFilters(filters);
  }

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (data?.data) {
      hasFirstRenderHappens.current = true;
    }
  }, [data?.data]);

  if (isLoading && !hasFirstRenderHappens.current) return <Spinner />;

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
                addOnClick={handleAdd}
                inputPlaceholder='Buscar cliente'
                leftChildren={
                  <IconButton
                    color='inherit'
                    aria-haspopup='true'
                    onClick={() => setIsFiltersModalOpened(true)}
                  >
                    <Icon
                      fontSize='1.5rem'
                      icon={
                        filters.owners.length
                          ? 'flat-color-icons:empty-filter'
                          : 'tabler:filter'
                      }
                    />
                  </IconButton>
                }
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

      <CustomerFiltersModal
        defaultValues={filters}
        isOpen={isFiltersModalOpened}
        onClose={() => setIsFiltersModalOpened(false)}
        onSubmit={handleSubmitFilters}
      />
    </>
  );
}
