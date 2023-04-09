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
import { Pagination } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { Breadcrumb } from '@/components/breadcrumb';
import {ProductModal} from "@/components/pages/product/product-modal";
import {createProductListTable} from "@/utils/tables/product/list";
import {IProduct} from "@/types/entities/IProduct";

export default function ProductListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddModalOpen, setIsAddModalOpen] =
    useState<boolean>(false);
  const [productToEdit, setProductToEdit] =
    useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] =
    useState<IProduct | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['sales-funnel', debouncedSearch, page],
    queryFn: () =>
      apiServices.product.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteProduct() {
    try {
      if (!productToDelete) return;

      await apiServices.product.delete(productToDelete.id);

      toast.success('Produto excluído com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar o produto.');
    } finally {
      setProductToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createProductListTable({
      productToDelete,
      setProductToDelete,
      handleDeleteProduct,
      setProductToEdit
    });
  }, [productToDelete, setProductToDelete, setProductToEdit]);

  function handleAdd() {
    setIsAddModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddModalOpen(false);
    setProductToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Produto' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar produto'
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
                  noRowsLabel: 'Nenhuma produto encontrada',
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

      <ProductModal
        isOpen={isAddModalOpen || !!productToEdit}
        onClose={handleCloseModal}
        defaultProduct={productToEdit}
        refetch={refetch}
      />
    </>
  );
}
