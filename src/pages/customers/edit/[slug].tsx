/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Grid from '@mui/material/Grid';

import { Breadcrumb } from '@/components/breadcrumb';
import { Spinner } from '@/components/spinner';
import { apiServices } from '@/services';
import { useRouter } from 'next/router';
import { CustomerEditCustomer } from '@/components/pages/customer/edit/customer';
import { CustomerEditTimeline } from '@/components/pages/customer/edit/timeline';

export default function CustomerEditPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['customer', router.query.slug],
    queryFn: () => apiServices.customer.get(router.query.slug as string),
    refetchInterval: false,
  });

  if (isLoading) return <Spinner />;

  console.log({ data });

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Anjos', link: '/' },
          { label: 'Clientes', link: '/customer/list' },
          { label: 'Visualizar' },
        ]}
      />

      <Grid container spacing={6} padding='1.5rem'>
        <Grid
          display='grid'
          gridTemplateColumns={{ sx: '1fr', lg: '1fr 1fr 1fr' }}
          gap='0.5rem'
          width='100%'
        >
          <CustomerEditCustomer customer={data?.data} refetch={refetch} />
          <CustomerEditTimeline />
        </Grid>
      </Grid>
    </>
  );
}
