import { AbilityContext } from '@/context/ability';
import { NavGroup, NavLink } from '@/types/app/layout';
import { ReactNode, useContext } from 'react';

interface Props {
  navGroup?: NavGroup;
  children: ReactNode;
}

export const CanViewNavGroup = (props: Props) => {
  const { children, navGroup } = props;
  const ability = useContext(AbilityContext);

  const checkForVisibleChild = (arr: NavLink[] | NavGroup[]): boolean => {
    return arr.some((i: NavGroup) => {
      if (i.children) {
        return checkForVisibleChild(i.children);
      } else {
        return ability?.can(i.action, i.subject);
      }
    });
  };

  const canViewMenuGroup = (item: NavGroup) => {
    const hasAnyVisibleChild =
      item.children && checkForVisibleChild(item.children);

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild;
    }

    return (
      ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
    );
  };

  return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null;
};
