import {apiServices} from '@/services';
import {GetCustomerCBResponse} from '@/services/customer/types';
import {Button, Link, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {Icon} from '@/components/icon';
import {SendActionMessage} from '@/components/pages/campaigns/pipelines/tabs/message';
import {SendActionConversation} from '@/components/pages/campaigns/pipelines/tabs/conversation';
import {SendActionSchedule} from '@/components/pages/campaigns/pipelines/tabs/schedule';
import {SendActionSale} from '@/components/pages/campaigns/pipelines/tabs/sale';
import {SendActionAppointment} from '@/components/pages/campaigns/pipelines/tabs/appointment';
import {formatDateToISO} from "@/utils/date";
import {formatNumberToBase100} from "@/utils/currency";
import {ChangeOwner} from "@/components/pages/campaigns/pipelines/tabs/owner";

interface PipelineCustomerMessageProps {
  customer: GetCustomerCBResponse['message'][0];
  boardId: string;
  type: string;
  onClose: () => void;
  refetch: () => void;
}

interface TabButtonProps {
  tab: 'owner' | 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale';
  activeTab: 'owner' | 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale';
  icon: string;
  title: string;
  onChange: (
    tab: 'owner' |  'message' | 'conversation' | 'schedule' | 'appointment' | 'sale',
  ) => void;
}

function TabButton({ activeTab, icon, tab, title, onChange }: TabButtonProps) {
  return (
    <Button
      variant={tab === activeTab ? 'contained' : 'text'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        gap: '0.5rem',
      }}
      onClick={() => onChange(tab)}
    >
      <Icon icon={icon} fontSize={16} />
      {title}
    </Button>
  );
}

export function PipelineCustomerActions({
  customer,
  boardId,
  onClose,
  refetch,
  type,
}: PipelineCustomerMessageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues: any = { message: '' };
  const [currentTab, setCurrentTab] = useState<
    'owner' | 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale'
  >('message');

  useEffect(() => {
    setCurrentTab(type as any);
  }, [type]);

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  async function handleSaveMessage(data: any) {
    try {
      setIsLoading(true);
      await apiServices.action.message({
        message: data.message,
        customerId: customer.id,
        boardId,
      });

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveConversation(data: any) {
    try {
      setIsLoading(true);

      await apiServices.action.conversation({
        resume: data.message,
        customerId: customer.id,
        boardId,
      });

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveSchedule(data: any) {
    try {
      setIsLoading(true);

      await apiServices.action.schedule({
        customerId: customer.id,
        boardId,
        date: formatDateToISO(data.date),
      });

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveAppointment(data: any) {
    try {
      setIsLoading(true);

      await apiServices.action.appointment({
        resume: data.resume,
        customerId: customer.id,
        boardId,
        date: formatDateToISO(data.date)
      });

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveSale(data: any) {
    try {
      setIsLoading(true);

      await apiServices.action.sale({
        productId: data.productId,
        strategySaleId: data.strategySaleId,
        productValue: formatNumberToBase100(data.productValue),
        customerId: customer.id,
        boardId,
      });

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeOwner(data: any) {
    try {
      setIsLoading(true);
      await apiServices.action.saveOwner(data.ownerId, customer.id, boardId);

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao ');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box
      padding='1rem'
      display='flex'
      alignItems='center'
      flexDirection='column'
    >
      <Typography fontSize='24px' fontWeight='bold'>
        Ações de cliente
      </Typography>

      <Typography>
        <Box gap={'0.9rem'} alignContent={'center'} alignItems={'center'}>
          {customer.name}

          {customer.whatsApp && (
            <Link
              href={'https://whatsa.me/55' + customer.whatsApp}
              target='_blank'
            >
              &nbsp; &nbsp; &nbsp;
              <Icon icon={'tabler:brand-whatsapp'} fontSize={25} />
            </Link>
          )}

          {customer.instagram && (
            <Link
              href={'https://instagram.com/' + customer.instagram}
              target='_blank'
            >
              &nbsp; <Icon icon={'tabler:brand-instagram'} fontSize={25} />
            </Link>
          )}
        </Box>
      </Typography>

      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row'}}
        alignItems='center'
        gap='0.5rem'
        mb='1rem'
        mt='1rem'
        width='100%'
      >
        <TabButton
          activeTab={currentTab}
          icon='tabler:at'
          onChange={setCurrentTab}
          tab='owner'
          title='Responsável'
        />

        <TabButton
          activeTab={currentTab}
          icon='tabler:message'
          onChange={setCurrentTab}
          tab='message'
          title='Mensagem'
        />
        <TabButton
          activeTab={currentTab}
          icon='tabler:brand-whatsapp'
          onChange={setCurrentTab}
          tab='conversation'
          title='Conversa'
        />
        <TabButton
          activeTab={currentTab}
          icon='tabler:calendar-plus'
          onChange={setCurrentTab}
          tab='schedule'
          title='Agendamento'
        />
        <TabButton
          activeTab={currentTab}
          icon='tabler:calendar-check'
          onChange={setCurrentTab}
          tab='appointment'
          title='Consulta'
        />
        <TabButton
          activeTab={currentTab}
          icon='tabler:coin'
          onChange={setCurrentTab}
          tab='sale'
          title='Venda'
        />
      </Box>


      {currentTab === 'owner' && (
        <ChangeOwner
          handleChangeOwner={handleChangeOwner}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}

      {currentTab === 'message' && (
        <SendActionMessage
          handleSaveNewMessage={handleSaveMessage}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}

      {currentTab === 'conversation' && (
        <SendActionConversation
          handleSaveConversation={handleSaveConversation}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}

      {currentTab === 'schedule' && (
        <SendActionSchedule
          handleSaveSchedule={handleSaveSchedule}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}

      {currentTab === 'appointment' && (
        <SendActionAppointment
          handleSaveAppointment={handleSaveAppointment}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}

      {currentTab === 'sale' && (
        <SendActionSale
          handleSaveSale={handleSaveSale}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}
    </Box>
  );
}
