import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { apiServices } from '@/services';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { Pagination } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { Breadcrumb } from '@/components/breadcrumb';
import {IStrategy} from "@/types/entities/IStrategy";
import {createStrategyListTable} from "@/utils/tables/strategy/list";
import {StrategyModal} from "@/components/pages/strategy/strategy-modal";

export default function StrategyListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddModalOpen, setIsAddModalOpen] =
    useState<boolean>(false);
  const [strategyToEdit, setStrategyToEdit] =
    useState<IStrategy | null>(null);
  const [strategyToDelete, setStrategyToDelete] =
    useState<IStrategy | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['sales-funnel', debouncedSearch, page],
    queryFn: () =>
      apiServices.strategy.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteStrategy() {
    try {
      if (!strategyToDelete) return;

      await apiServices.salesFunnel.delete(strategyToDelete.id);

      toast.success('Estratégia excluída com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar a estratégia.');
    } finally {
      setStrategyToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createStrategyListTable({
      strategyToDelete,
      setStrategyToDelete,
      handleDeleteStrategy,
      setStrategyToEdit
    });
  }, [strategyToDelete, setStrategyToDelete, setStrategyToEdit]);

  function handleAdd() {
    setIsAddModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddModalOpen(false);
    setStrategyToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Estratégia' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar Estratégia'
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
                  noRowsLabel: 'Nenhuma estratégia encontrada',
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

      <StrategyModal
        isOpen={isAddModalOpen || !!strategyToEdit}
        onClose={handleCloseModal}
        defaultStrategy={strategyToEdit}
        refetch={refetch}
      />
    </>
  );
}
