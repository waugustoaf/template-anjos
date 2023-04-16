/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import { Breadcrumb } from '@/components/breadcrumb';
import { Icon } from '@/components/icon';
import { ClinicTabBilling } from '@/components/pages/clinics/tabs/billings';
import { ClinicTabContract } from '@/components/pages/clinics/tabs/contract';
import { ClinicTabPersonalData } from '@/components/pages/clinics/tabs/personal-data';
import { clinicServices } from '@/services/clinics';
import { IClinic } from '@/types/entities/IClinic';
import { formatNumberToBase100 } from '@/utils/currency';
import { formatDateToISO, localDateToUTC } from '@/utils/date';
import { truthyObject } from '@/utils/functions/formatters';
import { Box, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import {AxiosError} from "axios";

interface TabButtonProps {
  tab: 'personal-data' | 'contract' | 'billings' | 'attachments';
  activeTab: 'personal-data' | 'contract' | 'billings' | 'attachments';
  icon: string;
  title: string;
  onChange: (
    tab: 'personal-data' | 'contract' | 'billings' | 'attachments',
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

function getTitle(title: string) {
  switch (title) {
    case 'personal-data':
      return 'Dados básicos';
    case 'contract':
      return 'Contrato';
    case 'billings':
      return 'Faturamento';
    case 'attachments':
      return 'Anexos';
    default:
      return '';
  }
}

export default function ClinicAddPage() {
  const [currentTab, setCurrentTab] = useState<
    'personal-data' | 'contract' | 'billings' | 'attachments'
  >('personal-data');
  const [currentClinicData, setCurrentClinicData] = useState<Partial<IClinic>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSaveClinic(data: Partial<IClinic>) {
    if (!data.name && !currentClinicData.id) {
      return toast.error('Preencha primeiro os dados básicos e salve-os');
    }

    const formattedData = truthyObject({
      ...data,
      birthDate: data.birthDate
        ? formatDateToISO(localDateToUTC(data.birthDate))
        : undefined,
      accumulativeTime: data.accumulativeTime
        ? Number(data.accumulativeTime)
        : undefined,
      projectTime: data.projectTime ? Number(data.projectTime) : undefined,
      startContract: data.startContract
        ? formatDateToISO(localDateToUTC(data.startContract))
        : undefined,
      endContract: data.endContract
        ? formatDateToISO(localDateToUTC(data.endContract))
        : undefined,
      afterAverageRevenue: data.afterAverageRevenue
        ? formatNumberToBase100(Number(data.afterAverageRevenue))
        : undefined,
      growthRate: data.growthRate
        ? formatNumberToBase100(Number(data.growthRate))
        : undefined,
      increaseRevenue: data.increaseRevenue === 'true',
      initialAverageRevenue: data.initialAverageRevenue
        ? formatNumberToBase100(Number(data.initialAverageRevenue))
        : undefined,
      initialRevenue: data.initialRevenue
        ? formatNumberToBase100(Number(data.initialRevenue))
        : undefined,
      startValue: data.startValue
        ? formatNumberToBase100(Number(data.startValue))
        : undefined,
      habitantsCount: data.habitantsCount
        ? Number(data.habitantsCount)
        : 0,
    });

    setCurrentClinicData((prevState) => ({
      ...prevState,
      ...formattedData,
    }));

    try {
      setIsLoading(true);

      const response = await clinicServices.create(formattedData);

      setCurrentClinicData((prevState) => ({
        ...prevState,
        ...response.data,
      }));
    } catch (e) {
      const error = e as AxiosError;
      if (error.code === 'ERR_BAD_REQUEST') {
        if (error.response?.data) {

          // @ts-ignore
          if (error.response?.data?.error?.includes('EMAIL_ALREADY_EXISTS')){
            return toast.error('E-mail já cadastrado');
          }

          // @ts-ignore
          if (error.response?.data?.error?.includes('DOCUMENT_ALREADY_EXISTS')){
            return toast.error('Documento já cadastrado');
          }
        }
        // @ts-ignore
        console.log(error.response?.data?.error);
        // @ts-ignore
        return toast.error(error.response?.data?.error);
      }
      console.log(error);
      toast.error('Erro ao salvar clínica');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Anjos', link: '/' },
          { label: 'Clínicas', link: '/clinics/list' },
          { label: 'Adicionar' },
          { label: getTitle(currentTab) },
        ]}
      />

      <Box display='flex' alignItems='center' gap='0.5rem' mb='1rem'>
        <TabButton
          activeTab={currentTab}
          icon='tabler:user-check'
          onChange={setCurrentTab}
          tab='personal-data'
          title='Dados básicos'
        />
        <TabButton
          activeTab={currentTab}
          icon='tabler:writing'
          onChange={setCurrentTab}
          tab='contract'
          title='Contrato'
        />
        <TabButton
          activeTab={currentTab}
          icon='tabler:currency-euro'
          onChange={setCurrentTab}
          tab='billings'
          title='Faturamento'
        />
      </Box>

      {currentTab === 'personal-data' && (
        <ClinicTabPersonalData
          handleSaveClinic={handleSaveClinic}
          isLoading={isLoading}
          defaultValues={currentClinicData}
        />
      )}

      {currentTab === 'contract' && (
        <ClinicTabContract
          handleSaveClinic={handleSaveClinic}
          isLoading={isLoading}
          defaultValues={currentClinicData}
        />
      )}

      {currentTab === 'billings' && (
        <ClinicTabBilling
          handleSaveClinic={handleSaveClinic}
          isLoading={isLoading}
          defaultValues={currentClinicData}
        />
      )}
    </>
  );
}
