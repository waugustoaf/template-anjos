import {useQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useRef, useState} from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {DataGrid, ptBR} from '@mui/x-data-grid';

import {Spinner} from '@/components/spinner';
import {TableHeader} from '@/components/table-header';
import {apiServices} from '@/services';
import {DatePickerWrapper} from '@/styles/libs/react-datepicker';
import {IconButton, Pagination, useMediaQuery} from '@mui/material';
import {toast} from 'react-hot-toast';
import {useDebounce} from 'use-debounce';
import {IClinic} from '@/types/entities/IClinic';
import {Breadcrumb} from '@/components/breadcrumb';
import {createClinicListTable} from '@/utils/tables/clinics/list';
import {ClinicFiltersModal, ClinicFiltersProps,} from '@/components/pages/clinics/filters-modal';
import {Icon} from '@/components/icon';

export default function ClinicListPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 750);
  const [clinicToDelete, setClinicToDelete] = useState<IClinic | null>(null);
  const [isFilterModalOpened, setIsFilterModalOpened] = useState(false);
  const [filters, setFilters] = useState<ClinicFiltersProps>(() => {
    const savedData = localStorage.getItem(
      '@anjosguia:dashboard:clinic-filters',
    );

    const defaultData = {
      categoryId: [],
      status: '',
      campaignStatus: '',
      contractStatus: '',
    };

    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const hasLoadedFirstTime = useRef(false);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['clinics', debouncedSearch, page, filters],
    queryFn: () =>
      apiServices.clinics.list({
        search: debouncedSearch,
        page,
      }, filters),
  });

  async function handleDeleteClinic() {
    try {
      if (!clinicToDelete) return;

      await apiServices.clinics.delete(clinicToDelete.id);

      toast.success('Clínica apagada com sucesso.');
      refetch();
    } catch {
      toast.error('Erro ao apagar a clínica.');
    } finally {
      setClinicToDelete(null);
    }
  }


  const [mobileColumns, desktopColumns, actionColumn] = useMemo(() => {
    const [mc, dc, ac] = createClinicListTable({
      clinicToDelete, setClinicToDelete, handleDeleteClinic
    });

    return [mc, [...mc, ...dc], ac];
  }, [clinicToDelete, setClinicToDelete, handleDeleteClinic]);
  

  const matches = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const columns = [
    ...(matches ? mobileColumns : desktopColumns),
    ...actionColumn,
  ];

  function handleSubmitFilters(filters: ClinicFiltersProps) {
    setFilters(filters);
    localStorage.setItem(
      '@anjosguia:dashboard:clinic-filters',
      JSON.stringify(filters),
    );
  }

  useEffect(() => {
    if (data?.data) {
      hasLoadedFirstTime.current = true;
    }
  }, [data?.data]);

  if (isLoading && !hasLoadedFirstTime.current) return <Spinner />;

  return (
    <DatePickerWrapper>
      <Breadcrumb
        items={[{ label: 'Anjos', link: '/' }, { label: 'Clínicas' }]}
      />

      <Grid container spacing={6}>
        <Grid item xs={12} className='page-card-mui'>
          <Card>
            <TableHeader
              search={search}
              onSearch={setSearch}
              inputPlaceholder='Buscar clínica'
              leftChildren={
                <IconButton
                  aria-haspopup='true'
                  onClick={() => setIsFilterModalOpened(true)}
                >
                  <Icon
                    fontSize='1.5rem'
                    icon={
                      filters.categoryId.length
                        ? 'flat-color-icons:empty-filter'
                        : 'tabler:filter'
                    }
                  />
                </IconButton>
              }
              addLink='/clinics/add'
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
                noRowsLabel: 'Nenhuma clínica encontrado',
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

      <ClinicFiltersModal
        defaultValues={filters}
        isOpen={isFilterModalOpened}
        onClose={() => setIsFilterModalOpened(false)}
        onSubmit={handleSubmitFilters}
      />
    </DatePickerWrapper>
  );
}
