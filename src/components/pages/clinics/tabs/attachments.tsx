import { apiServices } from '@/services';
import { mountForm } from '@/utils/form/mount-form';
import { TextEllipsis } from '@/utils/text';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export function ClinicTabAttachment() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const router = useRouter();
  const clinicId = router.query.slug as string;

  const { data, refetch, isLoading } = useQuery([], () =>
    apiServices.clinics.attachment.list({ id: router.query.slug as string }),
  );

  const { setValue, register, handleSubmit, reset } = useForm();

  function handleOpenModal() {
    setIsModalOpened(true);
  }

  function handleCloseModal() {
    reset();
    setIsModalOpened(false);
  }

  async function handleAddPicture(data: any) {
    if (!data.file || !data.description) {
      return toast.error('Preencha todos os campos');
    }

    const { file, description } = data;

    try {
      const uploadResponse = await apiServices.clinics.attachment.upload(
        clinicId,
        file,
      );

      await apiServices.clinics.attachment.create({
        clinicId,
        description,
        url: uploadResponse.data.Location,
      });

      refetch();
      handleCloseModal();
    } catch {
      toast.error('Erro ao adicionar anexo');
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} className='page-card-mui'>
          <Card>
            <CardHeader title='Anexos' />

            <Box display='flex' flexDirection='column' alignItems='flex-end'>
              <Button
                variant='contained'
                sx={{ marginRight: '1.5rem' }}
                onClick={handleOpenModal}
              >
                Adicionar
              </Button>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Anexo</TableCell>
                    <TableCell>Data</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box display='flex' gap='0.5rem' alignItems='center'>
                          <img
                            src={item.url}
                            alt={item.name}
                            style={{
                              height: '35px',
                              borderRadius: '50%',
                              width: '35px',
                              objectPosition: 'center',
                              objectFit: 'cover',
                            }}
                          />

                          <Typography fontSize='14px' fontWeight='bold'>
                            {TextEllipsis(item.name, 30)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {moment(item.createdAt).format('DD/MM/yyyy')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {isModalOpened && (
        <Dialog open onClose={handleCloseModal}>
          <DialogTitle>Adicionar anexo</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleAddPicture)}>
              {mountForm({
                fields: [
                  {
                    name: 'description',
                    rowSize: 12,
                    title: 'Descrição',
                    type: 'input',
                  },
                  {
                    name: 'file',
                    rowSize: 12,
                    title: 'Arquivo',
                    type: 'input-file',
                  },
                ],
                setValue: setValue,
                register: register,
                errors: {},
              })}

              <Button
                type='submit'
                variant='contained'
                sx={{ marginTop: '1rem', width: '100%' }}
              >
                Adicionar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
