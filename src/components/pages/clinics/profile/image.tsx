import { apiServices } from '@/services';
import { IClinic } from '@/types/entities/IClinic';
import { Box } from '@mui/material';
import { toast } from 'react-hot-toast';

interface ClinicProfileImageProps {
  clinic: Partial<IClinic>;
  refetch: () => void;
}
export function ClinicProfileImage({
  refetch,
  clinic,
}: ClinicProfileImageProps) {
  async function handleUpdateProfilePicture(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await apiServices.clinics.uploadProfilePicture(clinic?.id!, formData);

      toast.success('Foto de perfil atualizada com sucesso');
      refetch();
    } catch {
      toast.error('Erro ao atualizar foto de perfil');
    }
  }

  return (
    <Box>
      <input
        id='profile-image'
        type='file'
        accept='image/*'
        onChange={(e) => {
          if (e.target.files) {
            handleUpdateProfilePicture(e.target.files[0]);
          }
        }}
        style={{ display: 'none' }}
      />
      <label htmlFor='profile-image' style={{ cursor: 'pointer' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(168, 170, 174, 0.16)',
            backgroundImage: `url(${clinic?.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
          }}
          height='100px'
          width='100px'
          borderRadius='6px'
          marginTop='2rem'
        />
      </label>
    </Box>
  );
}
