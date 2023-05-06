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
import {SetCustomerTag} from "@/components/pages/campaigns/pipelines/tabs/tags";
import {CustomerTimeline} from "@/components/pages/customer/edit/timeline";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "@/components/spinner";

interface PipelineCustomerMessageProps {
  customer: GetCustomerCBResponse['message'][0];
  boardId: string;
  type: string;
  onClose: () => void;
  refetch: () => void;
}

interface TabButtonProps {
  tab: 'owner' | 'tags' | 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale' | 'timeline';
  activeTab: 'owner' | 'tags' | 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale'| 'timeline';
  icon: string;
  title: string;
  onChange: (
    tab: 'owner' | 'tags' | 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale' | 'timeline',
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
    'owner' | 'tags' | 'message' | 'conversation' | 'schedule' | 'appointment' | 'sale' | 'timeline'
  >('message');

  useEffect(() => {
    setCurrentTab(type as any);
  }, [type]);

  const actions = useQuery({
    queryKey: ['action'],
    queryFn: () => apiServices.action.getActionsList(boardId, customer.id)
  });

  if (isLoading && !actions) return <Spinner />;

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

      await actions.refetch();

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSetCustomerTag(data: any) {
    try {
      setIsLoading(true);

      await apiServices.action.tag({
        tagIds: data.tagsId,
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

      console.log( 'data', data);
      await apiServices.action.schedule({
        customerId: customer.id,
        boardId,
        id: data.id,
        date: formatDateToISO(data.date),
        resume: data.resume,
        confirm1: data.confirm1,
        confirm2: data.confirm2,
        confirmed: data.confirmed,
      });

      await actions.refetch();

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

      await actions.refetch();

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

      await actions.refetch();

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteSale(data: any){
    try {
      setIsLoading(true);

      await apiServices.action.deleteSale({
        saleId: data.id,
        customerId: customer.id,
      });

      await actions.refetch();

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
          <Link
            href={'../customers/edit/' + customer.id}
            target='_blank'
          >
            {customer.name}
          </Link>

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
          icon='tabler:tag'
          onChange={setCurrentTab}
          tab='tags'
          title='Tags'
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
          ownerId={customer.owner.id}
        />
      )}

      {currentTab === 'tags' && (
        <SetCustomerTag
          handleSetTag={handleSetCustomerTag}
          isLoading={isLoading}
          onClose={onClose}
          defaultTags={customer.tags}
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
          conversation={actions?.data?.conversation}
        />
      )}

      {currentTab === 'schedule' && (
        <SendActionSchedule
          handleSaveSchedule={handleSaveSchedule}
          isLoading={isLoading}
          onClose={onClose}
          schedule={actions?.data?.schedule}
        />
      )}

      {currentTab === 'appointment' && (
        <SendActionAppointment
          handleSaveAppointment={handleSaveAppointment}
          isLoading={isLoading}
          onClose={onClose}
          appointment={actions?.data?.appointment}
        />
      )}

      {currentTab === 'sale' && (
        <SendActionSale
          handleSaveSale={handleSaveSale}
          isLoading={isLoading}
          onClose={onClose}
          sale={actions?.data?.sale}
          handleDeleteSale={handleDeleteSale}
        />
      )}

      {currentTab === 'timeline' && (
        <CustomerTimeline customerId={customer.id} />
      )}

    </Box>
  );
}
