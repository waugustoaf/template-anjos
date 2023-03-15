import { useTranslation } from 'react-i18next';

interface Props {
  text: string;
}

export const Translations = ({ text }: Props) => {
  const { t } = useTranslation();

  return <>{`${t(text)}`}</>;
};
