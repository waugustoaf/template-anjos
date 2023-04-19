/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import { Breadcrumb } from '@/components/breadcrumb';
import { Icon } from '@/components/icon';
import { ProfilePasswordData } from '@/components/pages/profile/tabs/password-data';
import { ProfilePersonalData } from '@/components/pages/profile/tabs/personal-data';
import { userServices } from '@/services/user';
import { IProfile } from '@/types/entities/IProfile';
import { truthyObject } from '@/utils/functions/formatters';
import { Box, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

interface TabButtonProps {
  tab: 'personal-data' | 'password';
  activeTab: 'personal-data' | 'password';
  icon: string;
  title: string;
  onChange: (tab: 'personal-data' | 'password') => void;
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
    case 'password':
      return 'Trocar Senha';
    default:
      return '';
  }
}

export default function ProfileAddPage() {
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState<'personal-data' | 'password'>(
    'personal-data',
  );
  const [profileData, setProfileData] = useState<Partial<IProfile>>({
    email: user?.user?.email || '',
    fullName: user?.user?.fullName || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSaveProfile(data: Partial<IProfile>) {
    const formattedData = truthyObject({
      ...data,
    });

    setProfileData((prevState) => ({
      ...prevState,
      ...formattedData,
    }));

    try {
      setIsLoading(true);
      await userServices.changeMe(formattedData);
    } catch {
      toast.error('Erro ao salvar dados do usuário');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSavePassword(data: Partial<IProfile>) {
    setProfileData((prevState) => ({
      ...prevState,
      ...data,
    }));

    try {
      setIsLoading(true);
      await userServices.changePassword(
        data.email,
        data.newPassword,
        data.confirmPassword,
        data.currentPassword,
      );
    } catch {
      toast.error('Erro ao salvar atualizar a senha');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Breadcrumb
        items={[{ label: 'Meu Perfil' }, { label: getTitle(currentTab) }]}
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
          icon='tabler:password'
          onChange={setCurrentTab}
          tab='password'
          title='Trocar Senha'
        />
      </Box>

      {currentTab === 'personal-data' && (
        <ProfilePersonalData
          handleSaveProfile={handleSaveProfile}
          isLoading={isLoading}
          defaultValues={profileData}
        />
      )}

      {currentTab === 'password' && (
        <ProfilePasswordData
          handleSaveNewPassword={handleSavePassword}
          isLoading={isLoading}
          defaultValues={profileData}
        />
      )}
    </>
  );
}
