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
import { useDebounce } from 'use-debounce';
import * as yup from 'yup';
import { customerFormSchema } from '@/forms/login/schema';
import { ICustomer } from '@/types/entities/ICustomer';
import { customerFormFields } from '@/forms/customers';
import { Icon } from '@/components/icon';

const TabAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [documentType, setDocumentType] = useState('cpf');

  const [isCustomerCategoriesDrawerOpen, setIsCustomerCategoriesDrawerOpen] =
    useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerFormSchema),
    defaultValues: {
      documentType,
      status: 'active',
    } as any,
  });

  async function handleCreateUser(data: Partial<ICustomer>) {
    const body = {
      ...data,
      document: data.document?.replace(/\D/g, ''),
      cellphone: data.cellphone
        ? `+55${data.cellphone?.replace(/\D/g, '')}`
        : data.cellphone,
      whatsapp: data.whatsapp
        ? `+55${data.whatsapp?.replace(/\D/g, '')}`
        : data.whatsapp,
    };

    return console.log({ body });

    try {
      setIsLoading(true);

      // await customerServices.create(body);
      toast.success('Cliente criado com sucesso.');
      router.push('/dashboard/customers/list');
    } catch {
      toast.error('Erro ao criar cliente.');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Criar novo cliente' />

          <form onSubmit={handleSubmit(handleCreateUser)}>
            <CardContent style={{ marginTop: '-1rem' }}>
              {mountForm({
                errors,
                fields: customerFormFields,
                register,
                setValue
              })}

              <Button
                variant='contained'
                sx={{ '& svg': isLoading ? undefined : { mr: 2 }, mt: '2rem' }}
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    <Icon fontSize='1.125rem' icon='tabler:plus' />
                    Adicionar cliente
                  </>
                )}
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid>

      {/* <CreateCustomerCategoryToggler
        isOpen={isCustomerCategoriesDrawerOpen}
        onToggle={() =>
          setIsCustomerCategoriesDrawerOpen((prevState) => !prevState)
        }
        onChange={handleFetchCategories}
      /> */}
    </Grid>
  );
};

export default TabAccount;
