import { GetCustomerCBResponse } from '@/services/customer/types';
import { Dialog, DialogContent } from '@mui/material';
import { PipelineCustomerMessage } from './mesage';

interface CampaignsPipelinesModalProps {
  customer?: GetCustomerCBResponse['message'][0];
  type?: string;
  boardId: string;
  onClose: () => void;
  refetch: () => void;
}

const getChildren = (
  customer: GetCustomerCBResponse['message'][0],
  type: string,
  boardId: string,
  onClose: () => void,
  refetch: () => void,
) => {
  switch (type) {
    case 'message':
      return (
        <PipelineCustomerMessage
          customer={customer}
          onClose={onClose}
          refetch={refetch}
          boardId={boardId}
        />
      );

    default:
      return <></>;
  }
};

export function CampaignsPipelinesModal({
  type,
  customer,
  boardId,
  onClose,
  refetch
}: CampaignsPipelinesModalProps) {
  return (
    <Dialog open={!!customer} onClose={onClose} maxWidth={false}>
      <DialogContent>
        {customer && type && getChildren(customer, type, boardId, onClose, refetch)}
      </DialogContent>
    </Dialog>
  );
}
