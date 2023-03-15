import { themeConfig } from '@/config/app';
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import { PageSpecificSettings, Settings, SettingsContextValue } from './types';

interface SettingsProviderProps {
  children: ReactNode;
  pageSettings?: PageSpecificSettings | void;
}

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  skin: themeConfig.skin,
  footer: themeConfig.footer,
  layout: themeConfig.layout,
  lastLayout: themeConfig.layout,
  direction: themeConfig.direction,
  navHidden: themeConfig.navHidden,
  appBarBlur: themeConfig.appBarBlur,
  navCollapsed: themeConfig.navCollapsed,
  contentWidth: themeConfig.contentWidth,
  toastPosition: themeConfig.toastPosition,
  verticalNavToggleType: themeConfig.verticalNavToggleType,
  appBar:
    themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden'
      ? 'fixed'
      : themeConfig.appBar,
};

const staticSettings = {
  appBar: initialSettings.appBar,
  footer: initialSettings.footer,
  layout: initialSettings.layout,
  navHidden: initialSettings.navHidden,
  lastLayout: initialSettings.lastLayout,
  toastPosition: initialSettings.toastPosition,
};

const restoreSettings = (): Settings | null => {
  let settings = null;

  try {
    const storedData: string | null = window.localStorage.getItem('settings');

    if (storedData) {
      settings = { ...JSON.parse(storedData), ...staticSettings };
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};

const storeSettings = (settings: Settings) => {
  const initSettings = Object.assign({}, settings);

  delete initSettings.appBar;
  delete initSettings.footer;
  delete initSettings.layout;
  delete initSettings.navHidden;
  delete initSettings.lastLayout;
  delete initSettings.toastPosition;
  window.localStorage.setItem('settings', JSON.stringify(initSettings));
};

export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({
  children,
  pageSettings,
}: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings({ ...restoredSettings });
    }
    if (pageSettings) {
      setSettings({ ...settings, ...pageSettings });
    }
  }, [pageSettings]);

  useEffect(() => {
    if (settings.layout === 'horizontal' && settings.mode === 'semi-dark') {
      saveSettings({ ...settings, mode: 'light' });
    }
    if (settings.layout === 'horizontal' && settings.appBar === 'hidden') {
      saveSettings({ ...settings, appBar: 'fixed' });
    }
  }, [settings.layout]);

  const saveSettings = (updatedSettings: Settings) => {
    storeSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = (): SettingsContextValue =>
  useContext(SettingsContext);
