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
import {IAutoPilot} from "@/types/entities/IAutoPilot";
import {createAutoPilotListTable} from "@/utils/tables/auto-pilot/list";
import {AutoPilotModal} from "@/components/pages/auto-pilot/autoPilot-modal";

export default function AutoPilotListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddAutoPilotModalOpen, setIsAddAutoPilotModalOpen] =
    useState<boolean>(false);
  const [autoPilotToEdit, setAutoPilotToEdit] = useState<IAutoPilot | null>(null);
  const [autoPilotToDelete, setAutoPilotToDelete] = useState<IAutoPilot | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['autoPilot', debouncedSearch, page],
    queryFn: () =>
      apiServices.autoPilot.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteAutoPilot() {
    try {
      if (!autoPilotToDelete) return;

      await apiServices.angel.delete(autoPilotToDelete.id);

      toast.success('Piloto Automático apagado com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar o piloto automático.');
    } finally {
      setAutoPilotToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createAutoPilotListTable({
      handleDeleteAutoPilot,
      autoPilotToDelete,
      setAutoPilotToDelete,
      setAutoPilotToEdit,
    });
  }, [autoPilotToDelete, setAutoPilotToDelete, setAutoPilotToEdit]);


  function handleAddAutoPilot() {
    setIsAddAutoPilotModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddAutoPilotModalOpen(false);
    setAutoPilotToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Piloto Automático' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <TableHeader
              search={search}
              onSearch={setSearch}
              inputPlaceholder='Buscar piloto automático'
              addOnClick={handleAddAutoPilot}
            />
            <Card>
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
                  noRowsLabel: 'Nenhum piloto automático encontrado',
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

      <AutoPilotModal
        isOpen={isAddAutoPilotModalOpen || !!autoPilotToEdit}
        onClose={handleCloseModal}
        defaultAutoPilot={
          autoPilotToEdit
            ? { ...autoPilotToEdit }
            : undefined
        }
        refetch={refetch}
      />
    </>
  );
}
