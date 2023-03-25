import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { CategoryModal } from '@/components/pages/category/category-modal';
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
import {ICategory} from "@/types/entities/ICategory";
import {createCategoryListTable} from "@/utils/tables/categories/list";

export default function CategoryPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddCategoryModalOpen, setIsAddCagegoryModalOpen] =
    useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] =
    useState<ICategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] =
    useState<ICategory | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['category', debouncedSearch, page],
    queryFn: () =>
      apiServices.categories.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteSalesFunnel() {
    try {
      if (!categoryToDelete) return;

      await apiServices.categories.delete(categoryToDelete.id);
      toast.success('Categoria excluida com sucesso !');
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
      setCategoryToEdit,
      setCategoryToDelete,
    });
  }, [categoryToDelete, setCategoryToDelete, setCategoryToEdit]);

  function handleAddCategory() {
    setIsAddCagegoryModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddCagegoryModalOpen(false);
    setCategoryToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Categorias' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar categorias'
                addOnClick={handleAddCategory}
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
                  noRowsLabel: 'Nenhuma categoria encontrada',
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

      <CategoryModal
        isOpen={isAddCategoryModalOpen || !!categoryToEdit}
        onClose={handleCloseModal}
        defaultCategory={categoryToEdit}
        refetch={refetch}
      />
    </>
  );
}
