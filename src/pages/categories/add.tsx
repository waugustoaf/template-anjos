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

export default function CategoryAddPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categoryFormSchema),
    defaultValues: {
      autoPilot: false,
    } as any,
  });

  async function handleCreateCategory(data: Partial<ICategory>) {

    try {
      setIsLoading(true);

      await apiServices.categories.create(data);
      toast.success('Categoria criado com sucesso.');
      router.push('/categories/list');
    } catch {
      toast.error('Erro ao adicionar a categoria.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Adicionar nova categoria' />

          <form onSubmit={handleSubmit(handleCreateCategory)}>
            <CardContent style={{ marginTop: '-1rem' }}>
              {mountForm({
                errors,
                fields: categoryFormFields,
                register,
                setValue,
              })}

              <SubmitButton isLoading={isLoading} title='Adicionar' />
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
