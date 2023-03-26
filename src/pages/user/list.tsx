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
import { UserModal } from '@/components/pages/user/user-modal';
import {IUser} from "@/types/entities/IUser";
import {createUserListTable} from "@/utils/tables/users/list";

export default function SalesListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [isAddUserModalOpen, setIsAddUserModalOpen] =
    useState<boolean>(false);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['user', debouncedSearch, page],
    queryFn: () =>
      apiServices.user.list({
        search: debouncedSearch,
        page,
      }),
  });

  async function handleDeleteUser() {
    try {
      if (!userToDelete) return;

      await apiServices.user.delete(userToDelete.id);

      toast.success('Usuário apagado com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar usuário.');
    } finally {
      setUserToDelete(null);
    }
  }

  const columns = useMemo(() => {
    return createUserListTable({
      handleDeleteUser,
      userToDelete,
      setUserToDelete,
      setUserToEdit,
    });
  }, [userToDelete, setUserToDelete, setUserToEdit]);

  function handleAddAngel() {
    setIsAddUserModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddUserModalOpen(false);
    setUserToEdit(null);
  }

  if (isLoading && !data) return <Spinner />;

  return (
    <>
      <DatePickerWrapper>
        <Breadcrumb
          items={[{ label: 'Anjos', link: '/' }, { label: 'Usuários' }]}
        />

        <Grid container spacing={6}>
          <Grid item xs={12} className='page-card-mui'>
            <Card>
              <TableHeader
                search={search}
                onSearch={setSearch}
                inputPlaceholder='Buscar usuário'
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
                  noRowsLabel: 'Nenhum usuário encontrado',
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

      <UserModal
        isOpen={isAddUserModalOpen || !!userToEdit}
        onClose={handleCloseModal}
        defaultUser={
          userToEdit
            ? { ...userToEdit, isAdmin: userToEdit.grantType === 90 }
            : undefined
        }
        refetch={refetch}
      />
    </>
  );
}
