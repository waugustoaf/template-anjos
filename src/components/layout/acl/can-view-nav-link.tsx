import { AbilityContext } from '@/context/ability';
import { NavLink } from '@/types/app/layout';
import { ReactNode, useContext } from 'react';

interface Props {
  navLink?: NavLink
  children: ReactNode
}

export const CanViewNavLink = (props: Props) => {
  const { children, navLink } = props;
  const ability = useContext(AbilityContext);

  return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null;
};
