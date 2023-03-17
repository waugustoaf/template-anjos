/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { mountForm } from '@/utils/form/mount-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

import { useForm } from 'react-hook-form';

import { SubmitButton } from '@/components/form/submit-button';
import { Spinner } from '@/components/spinner';
import { categoryFormFields } from '@/forms/categories';
import { categoryFormSchema } from '@/forms/categories/schema';
import { apiServices } from '@/services';
import { ICategory } from '@/types/entities/ICategory';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Breadcrumb } from '@/components/breadcrumb';

export default function CategoryAddPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['category', router.query.slug],
    queryFn: () => apiServices.categories.get(router.query.slug as string),
    refetchInterval: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categoryFormSchema),
    defaultValues: {
      autoPilot: false,
    } as any,
  });

  async function handleEditCategory(data: Partial<ICategory>) {
    try {
      setIsSubmitting(true);

      await apiServices.categories.update(router.query.slug as string, data);
      toast.success('Categoria editada com sucesso.');
      router.push('/categories/list');
    } catch {
      toast.error('Erro ao editada a categoria.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Anjos', link: '/' },
          { label: 'Categorias', link: '/categories/list' },
          { label: 'Editar' },
        ]}
      />

      <Grid container spacing={6}>
        <Grid item xs={12} className='page-card-mui'>
          <Card>
            <CardHeader title='Editar categoria' />

            <form onSubmit={handleSubmit(handleEditCategory)}>
              <CardContent style={{ marginTop: '-1rem' }}>
                {mountForm({
                  errors,
                  fields: categoryFormFields,
                  register,
                  setValue,
                  defaultValues: { ...data?.data },
                })}

                <SubmitButton isLoading={isSubmitting} title='Salvar' />
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
