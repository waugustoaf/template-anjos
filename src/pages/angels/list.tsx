import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { apiServices } from '@/services';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { IAngel } from '@/types/entities/IAngel';
import { Pagination } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { Breadcrumb } from '@/components/breadcrumb';
import { AngelModal } from '@/components/pages/angels/angels-modal';
import { createAngelListTable } from '@/utils/tables/angels/list';

export default function SalesListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddAngelModalOpen, setIsAddAngelModalOpen] =
    useState<boolean>(false);
  const [angelToEdit, setAngelToEdit] = useState<IAngel | null>(null);
  const [angelToDelete, setAngelToDelete] = useState<IAngel | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['sales-funnel', debouncedSearch, page],
    queryFn: () =>
      apiServices.angel.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteAngel() {
    try {
      if (!angelToDelete) return;

      await apiServices.angel.delete(angelToDelete.id);

      toast.success('Anjo apagado com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar o anjo.');
    } finally {
      setAngelToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createAngelListTable({
      handleDeleteAngel,
      angelToDelete,
      setAngelToDelete,
      setAngelToEdit,
    });
  }, [angelToDelete, setAngelToDelete, setAngelToEdit]);

  function handleAddAngel() {
    setIsAddAngelModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddAngelModalOpen(false);
    setAngelToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Anjos' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar anjo'
                addOnClick={handleAddAngel}
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

      <AngelModal
        isOpen={isAddAngelModalOpen || !!angelToEdit}
        onClose={handleCloseModal}
        defaultAngel={
          angelToEdit
            ? { ...angelToEdit, isAdmin: angelToEdit.grantType === 190 }
            : undefined
        }
        refetch={refetch}
      />
    </>
  );
}
