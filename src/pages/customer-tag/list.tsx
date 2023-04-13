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
import {ICustomerTag} from "@/types/entities/ICustomerTag";
import {createCustomerTagListTable} from "@/utils/tables/customer-tag/list";
import {CustomerTagModal} from "@/components/pages/customer-tag/customerTag-modal";

export default function ProductListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddModalOpen, setIsAddModalOpen] =
    useState<boolean>(false);
  const [customerTagToEdit, setCustomerTagToEdit] =
    useState<ICustomerTag | null>(null);
  const [customerTagToDelete, setCustomerTagToDelete] =
    useState<ICustomerTag | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['customertag', debouncedSearch, page],
    queryFn: () =>
      apiServices.customerTag.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteCustomerTag() {
    try {
      if (!customerTagToDelete) return;

      await apiServices.customerTag.delete(customerTagToDelete.id);

      toast.success('Tag excluída com sucesso.');
      refetch();
    } catch {
      toast.error('Essa tag não pode ser excluída, Tag Em uso.');
    } finally {
      setCustomerTagToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createCustomerTagListTable({
      customerTagToDelete,
      setCustomerTagToDelete,
      handleDeleteCustomerTag,
      setCustomerTagToEdit,
    });
  }, [customerTagToDelete, setCustomerTagToDelete, setCustomerTagToEdit]);

  function handleAdd() {
    setIsAddModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddModalOpen(false);
    setCustomerTagToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Tag' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar tag'
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
                  noRowsLabel: 'Nenhuma tag encontrada',
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

      <CustomerTagModal
        isOpen={isAddModalOpen || !!customerTagToEdit}
        onClose={handleCloseModal}
        defaultCustomerTag={customerTagToEdit}
        refetch={refetch}
      />
    </>
  );
}
