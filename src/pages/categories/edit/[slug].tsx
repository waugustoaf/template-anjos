/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { mountForm } from '@/utils/form/mount-form';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { ICustomer } from '@/types/entities/ICustomer';
import { Icon } from '@/components/icon';
import { categoryFormFields } from '@/forms/categories';
import { ICategory } from '@/types/entities/ICategory';
import { apiServices } from '@/services';
import { SubmitButton } from '@/components/form/submit-button';
import { categoryFormSchema } from '@/forms/categories/schema';
import { Spinner } from '@/components/spinner';

export default function CategoryAddPage() {
  const [item, setItem] = useState<ICategory | 'loading'>('loading');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      setIsLoading(true);

      await apiServices.categories.update(router.query.slug as string, data);
      toast.success('Categoria editada com sucesso.');
      router.push('/categories/list');
    } catch {
      toast.error('Erro ao editada a categoria.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchCategory() {
    try {
      const { slug } = router.query;

      if (!slug) return;

      const response = await apiServices.categories.get(slug as string);

      setItem(response.data);
      reset({ ...response.data });
    } catch {
      toast.error('Erro ao carregar a categoria.');
      router.push('/categories/list');
    }
  }

  useEffect(() => { 
    handleFetchCategory();
  }, []);

  if (item === 'loading') return <Spinner />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Adicionar nova categoria' />

          <form onSubmit={handleSubmit(handleEditCategory)}>
            <CardContent style={{ marginTop: '-1rem' }}>
              {mountForm({
                errors,
                fields: categoryFormFields,
                register,
                setValue,
                defaultValues: { ...item },
              })}

              <SubmitButton isLoading={isLoading} title='Salvar' />
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
