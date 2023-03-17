import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { SalesFunnelModal } from '@/components/pages/sales-funnel/sales-funnel-modal';
import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { apiServices } from '@/services';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';
import { createSalesFunnelListTable } from '@/utils/tables/sales-funnel/list';
import { Pagination } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

export default function SalesListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddSalesFunnelModalOpen, setIsAddSalesFunnelModalOpen] =
    useState<boolean>(false);
  const [salesFunnelToEdit, setSalesFunnelToEdit] =
    useState<ISalesFunnel | null>(null);
  const [salesFunnelToDelete, setSalesFunnelToDelete] =
    useState<ISalesFunnel | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['sales-funnel', debouncedSearch, page],
    queryFn: () =>
      apiServices.salesFunnel.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteSalesFunnel() {
    try {
      if (!salesFunnelToDelete) return;

      await apiServices.salesFunnel.delete(salesFunnelToDelete.id);

      toast.success('Funil de vendas apagado com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar o funil de vendas.');
    } finally {
      setSalesFunnelToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createSalesFunnelListTable({
      handleDeleteSalesFunnel,
      salesFunnelToDelete,
      setSalesFunnelToDelete,
      setSalesFunnelToEdit,
    });
  }, [salesFunnelToDelete, setSalesFunnelToDelete, setSalesFunnelToEdit]);

  function handleAddSalesFunnel() {
    setIsAddSalesFunnelModalOpen(true);
  }

  function handleEditSalesFunnel(salesFunnel: ISalesFunnel) {
    setSalesFunnelToEdit(salesFunnel);
  }

  function handleCloseModal() {
    setIsAddSalesFunnelModalOpen(false);
    setSalesFunnelToEdit(null);
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar funil de vendas'
                addOnClick={handleAddSalesFunnel}
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
                  noRowsLabel: 'Nenhum funil de vendas encontrado',
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

      <SalesFunnelModal
        isOpen={isAddSalesFunnelModalOpen || !!salesFunnelToEdit}
        onClose={handleCloseModal}
        defaultSalesFunnel={salesFunnelToEdit}
        refetch={refetch}
      />
    </>
  );
}
