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
import { ICategory } from '@/types/entities/ICategory';
import { createCategoryListTable } from '@/utils/tables/categories/list';

export default function CategoryListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['categories', debouncedSearch, page],
    queryFn: () =>
      apiServices.categories.list({
        search: debouncedSearch,
        page,
      }),
  });

  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null,
  );

  async function handleDeleteCategory() {
    try {
      if (!categoryToDelete) return;

      await apiServices.categories.delete(categoryToDelete.id);

      toast.success('Categoria apagada com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar a categoria.');
    } finally {
      setCategoryToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createCategoryListTable({
      categoryToDelete,
      setCategoryToDelete,
      handleDeleteCategory,
    });
  }, [categoryToDelete, setCategoryToDelete, handleDeleteCategory]);

  if (isLoading) return <Spinner />;

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              search={search}
              onSearch={setSearch}
              inputPlaceholder='Buscar categoria'
              addLink='/categories/add'
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
                noRowsLabel: 'Nenhuma categoria encontrado',
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
