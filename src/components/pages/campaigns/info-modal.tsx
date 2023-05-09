import { Icon } from '@/components/icon';
import { CreatedCampaigns } from '@/components/pages/campaigns/created';
import { ICampaignFull } from '@/types/entities/ICampaign';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

interface ModalInfoCampaignProps {
  isLoading: boolean;
  campaign?: ICampaignFull | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalInfoCampaign({
  isLoading,
  campaign,
  isOpen,
  onClose,
}: ModalInfoCampaignProps) {
  if (!isLoading && !campaign) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='xl'>
      <DialogTitle>
        <Box
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography>Informações da campanha</Typography>

          <IconButton color='inherit' aria-haspopup='true' onClick={onClose}>
            <Icon fontSize='1.5rem' icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {isLoading ? (
          <Box
            minHeight='400px'
            alignItems='center'
            justifyContent='center'
            width='100%'
            display='flex'
          >
            <CircularProgress size={24} />
          </Box>
        ) : (
          <CreatedCampaigns
            campaign={campaign as ICampaignFull}
            isFromPipeline
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
