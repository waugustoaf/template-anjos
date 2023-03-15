import { ReactNode } from 'react';

import { useSettings } from '@/hooks/useSettings';
import { VerticalNavItems } from '@/navigation';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Layout } from '..';
import { AppBarContent } from '../app-bar-content';

interface Props {
  children: ReactNode;
  contentHeightFixed?: boolean;
}

export const UserLayout = ({ children, contentHeightFixed }: Props) => {
  const { settings, saveSettings } = useSettings();

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical';
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems(),
        },
        appBar: {
          content: (props) => (
            <AppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          ),
        },
      }}
    >
      {children}
    </Layout>
  );
};
