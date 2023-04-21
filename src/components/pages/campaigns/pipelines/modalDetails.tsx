import {apiServices} from '@/services';
import {GetCustomerCBResponse} from '@/services/customer/types';
import {Button, Link, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {Icon} from "@/components/icon";
import {SendActionMessage} from "@/components/pages/campaigns/pipelines/tabs/message";
import {SendActionConversation} from "@/components/pages/campaigns/pipelines/tabs/conversation";
import {SendActionSchedule} from "@/components/pages/campaigns/pipelines/tabs/schedule";
import {SendActionSale} from "@/components/pages/campaigns/pipelines/tabs/sale";
import {SendActionAppointment} from "@/components/pages/campaigns/pipelines/tabs/appointment";

interface PipelineCustomerMessageProps {
  customer: GetCustomerCBResponse['message'][0];
  boardId: string;
  type: string;
  onClose: () => void;
  refetch: () => void;
}

interface TabButtonProps {
  tab: 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale';
  activeTab: 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale';
  icon: string;
  title: string;
  onChange: (
    tab: 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale',
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
    'message' | 'conversation' | 'schedule' | 'appointment' | 'sale'
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
    console.log('data - cheguei', data);
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

  async function handleSaveAppointment(data: any) {
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

  async function handleSaveSale(data: any) {
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
        <Box gap={'0.9rem'} alignContent={'center'} alignItems={'center'} >
          {customer.name}

          { customer.whatsApp &&
            <Link href={'https://whatsa.me/55'+customer.whatsApp} target='_blank'>
              &nbsp; &nbsp; &nbsp;<Icon icon={'tabler:brand-whatsapp'} fontSize={25} />
            </Link>
          }

          { customer.instagram &&
          <Link href={'https://instagram.com/'+customer.instagram} target='_blank'>
            &nbsp;  <Icon icon={'tabler:brand-instagram'} fontSize={25} />
          </Link>
          }
        </Box>
      </Typography>


      <Box display='flex' alignItems='center' gap='0.5rem' mb='1rem'>
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

      {currentTab === 'message' && (
        <SendActionMessage
          handleSaveNewMessage={handleSaveMessage}
          isLoading={isLoading}
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
          handleSaveAppointment={handleSaveSchedule}
          isLoading={isLoading}
        />
      )}

      {currentTab === 'sale' && (
        <SendActionSale
          handleSaveSale={handleSaveSale}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}


      {/*<Box
        display='flex'
        alignItems='center'
        gap='1rem'
        width='100%'
        justifyContent='space-between'
        flexDirection={{ sx: 'column', md: 'column', lg: 'row' }}
        marginTop='1rem'
      >
        <Button
          variant='contained'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Msg. Rede Social
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Msg. Conversa
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Consulta
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Agendamento
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Venda
        </Button>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box marginTop='1rem' width='100%'>
          {mountForm({
            fields: [
              {
                name: 'message',
                rowSize: 12,
                title: 'Mensagem',
                type: 'textarea',
                placeholder: 'Mensagem que foi enviada',
              },
            ],
            errors,
            defaultValues,
            register,
            setValue,
            trigger,
          })}
        </Box>

        <Box display='flex' alignItems='center' gap='1rem'>
          <SubmitButton isLoading={isLoading} title='Salvar' />
          <Button variant='text' onClick={onClose} sx={{ marginTop: '32px' }}>
            Cancelar
          </Button>
        </Box>
      </form>*/}
    </Box>
  );
}
