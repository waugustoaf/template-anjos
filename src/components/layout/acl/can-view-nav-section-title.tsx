import { AbilityContext } from '@/context/ability';
import { NavSectionTitle } from '@/types/app/layout';
import { ReactNode, useContext } from 'react';

interface Props {
  children: ReactNode;
  navTitle?: NavSectionTitle;
}

export const CanViewNavSectionTitle = (props: Props) => {
  const { children, navTitle } = props;

  const ability = useContext(AbilityContext);

  return ability && ability.can(navTitle?.action, navTitle?.subject) ? (
    <>{children}</>
  ) : null;
};
