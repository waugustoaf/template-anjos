/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import { mountForm } from '@/utils/form/mount-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

import { useForm } from 'react-hook-form';

import { SubmitButton } from '@/components/form/submit-button';
import { categoryFormFields } from '@/forms/categories';
import { categoryFormSchema } from '@/forms/categories/schema';
import { apiServices } from '@/services';
import { ICategory } from '@/types/entities/ICategory';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Breadcrumb } from '@/components/breadcrumb';

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
    <>
      <Breadcrumb
        items={[
          { label: 'Anjos', link: '/' },
          { label: 'Categorias', link: '/categories/list' },
          { label: 'Adicionar' },
        ]}
      />
      
      <Grid container spacing={6}>
        <Grid item xs={12} className='page-card-mui'>
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
    </>
  );
}
