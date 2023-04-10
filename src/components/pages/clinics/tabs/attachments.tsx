import { apiServices } from '@/services';
import { mountForm } from '@/utils/form/mount-form';
import { TextEllipsis } from '@/utils/text';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
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
  Link,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {Icon} from "@/components/icon";

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
            <Box
              display='flex'
              alignItems='center'
              width='100%'
              justifyContent='space-between'
            >
              <CardHeader title='Anexos' />
              <Button
                variant='contained'
                sx={{ marginRight: '1.5rem' }}
                onClick={handleOpenModal}
              >
                Adicionar
              </Button>
            </Box>

            {isLoading ? (
              <CircularProgress
                sx={{ margin: '2rem auto', display: 'block' }}
              />
            ) : (
              <Box display='flex' flexDirection='column' alignItems='flex-end'>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Anexo</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box display='flex' gap='0.5rem' alignItems='center'>
                            {item.url.includes('.png') || item.url.includes('.jpg') || item.url.includes('.jpeg') || item.url.includes('.gif') ? <img
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
                              : item.url.includes('.pdf') ?
                                <Icon icon='tabler:pdf' style={{
                                  height: '35px',
                                  borderRadius: '50%',
                                  width: '35px',
                                  objectPosition: 'center',
                                  objectFit: 'cover',
                                }} />
                                : item.url.includes('.doc') || item.url.includes('.docx') ?
                                  <Icon icon='tabler:notes' style={{
                                    height: '35px',
                                    borderRadius: '50%',
                                    width: '35px',
                                    objectPosition: 'center',
                                    objectFit: 'cover',
                                  }} />
                                  : item.url.includes('.xls') || item.url.includes('.xlsx') ?
                                    <Icon icon='tabler:edit' style={{
                                      height: '35px',
                                      borderRadius: '50%',
                                      width: '35px',
                                      objectPosition: 'center',
                                      objectFit: 'cover',
                                    }} />
                                    : item.url.includes('.ppt') || item.url.includes('.pptx') ?
                                      <Icon icon='tabler:presentation-analytics' style={{
                                        height: '35px',
                                        borderRadius: '50%',
                                        width: '35px',
                                        objectPosition: 'center',
                                        objectFit: 'cover',
                                      }} />
                                      : item.url.includes('.zip') || item.url.includes('.rar') ?
                                        <Icon icon='tabler:zip' style={{
                                          height: '35px',
                                          borderRadius: '50%',
                                          width: '35px',
                                          objectPosition: 'center',
                                          objectFit: 'cover',
                                        }} />
                                        : item.url.includes('.mp4') || item.url.includes('.avi') || item.url.includes('.mov') || item.url.includes('.wmv') ?
                                          <Icon icon='tabler:movie' style={{
                                            height: '35px',
                                            borderRadius: '50%',
                                            width: '35px',
                                            objectPosition: 'center',
                                            objectFit: 'cover',
                                          }} />
                                          : item.url.includes('.mp3') || item.url.includes('.wav') || item.url.includes('.wma') ?
                                            <Icon icon='tabler:headphones' style={{
                                              height: '35px',
                                              borderRadius: '50%',
                                              width: '35px',
                                              objectPosition: 'center',
                                              objectFit: 'cover',
                                            }} />
                                            : <Icon icon='tabler:file-dots' style={{
                                              height: '35px',
                                              borderRadius: '50%',
                                              width: '35px',
                                              objectPosition: 'center',
                                              objectFit: 'cover',
                                            }} />
                            }
                            <Typography fontSize='14px' fontWeight='bold'>
                              {TextEllipsis(item.name, 30)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {moment(item.createdAt).format('DD/MM/yyyy')}
                        </TableCell>
                        <TableCell>
                          <Link href={item.url} target='_blank'> <Icon icon='tabler:file-download' style={{
                            height: '25px',
                            width: '25px',
                          }} /> </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
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
                    title: 'Informe uma descrição resumida do arquivo',
                    type: 'input',
                  },
                  {
                    name: 'file',
                    rowSize: 12,
                    title: 'Arquivo',
                    type: 'input-file',
                    fileAccept: {
                      title: "Todos os arquivos",
                      fileType: "*",
                    },
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
