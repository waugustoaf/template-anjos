import { ResolveFieldProps } from '@/utils/form/mount-form';
import { Box, Grid, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(4),
}));

export function InputFile(props: ResolveFieldProps) {
  const { field, setValue, defaultValue } = props;
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: Boolean(field.multipleFiles),
    accept: field.fileAccept || {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    onDrop: (acceptedFiles) => {
      setFile(Object.assign(acceptedFiles[0]));
    },
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
  });

  useEffect(() => {
    if (file && setValue) {
      setValue(field.name, file);
    }
  }, [file]);

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          cursor: 'pointer',
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #575B6E',
          borderRadius: '6px',
        }}
      >
        {
          // @ts-ignore
          <input {...getInputProps()} />
        }
        {file ? (
          <Box display='flex' alignItems='center' justifyContent='center'>
            <img
              alt={file.name}
              className='single-file-image'
              style={{ width: '100%', maxWidth: '10rem' }}
              src={URL.createObjectURL(file as any)}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Img
              alt='Arquivo para upload'
              src={
                file
                  ? URL.createObjectURL(file)
                  : defaultValue || `/images/pages/upload.png`
              }
            />
            <Typography variant='h5'>
              {field.fileFieldTitle ?? 'Upload de arquivos.'}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Arraste e solte um arquivo aqui ou clique para selecionar um
              arquivo.
            </Typography>
          </Box>
        )}
      </Box>
    </Grid>
  );
}
