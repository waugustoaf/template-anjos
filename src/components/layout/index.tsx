import { useEffect, useRef } from 'react';

import { LayoutProps } from '@/types/app/layout';
import { VerticalLayout } from './vertical';

export const Layout = (props: LayoutProps) => {
    const { hidden, children, settings, saveSettings } = props;

    const isCollapsed = useRef(settings.navCollapsed);

  useEffect(() => {
    if (hidden) {
      if (settings.navCollapsed) {
        saveSettings({ ...settings, navCollapsed: false, layout: 'vertical' });
        isCollapsed.current = true;
      }
    } else {
      if (isCollapsed.current) {
        saveSettings({
          ...settings,
          navCollapsed: true,
          layout: settings.lastLayout,
        });
        isCollapsed.current = false;
      } else {
        if (settings.lastLayout !== settings.layout) {
          saveSettings({ ...settings, layout: settings.lastLayout });
        }
      }
    }
  }, [hidden]);

  return <VerticalLayout {...props}>{children}</VerticalLayout>;
};
