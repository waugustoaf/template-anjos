import {
  NavLink,
  NavGroup,
  LayoutProps,
  NavSectionTitle,
} from '@/types/app/layout';
import { VerticalNavGroup } from './nav-group';
import { VerticalNavLink } from './nav-link';
import { VerticalNavSectionTitle } from './nav-section-title';

interface Props {
  parent?: NavGroup;
  navHover?: boolean;
  navVisible?: boolean;
  groupActive: string[];
  isSubToSub?: NavGroup;
  currentActiveGroup: string[];
  navigationBorderWidth: number;
  settings: LayoutProps['settings'];
  saveSettings: LayoutProps['saveSettings'];
  setGroupActive: (value: string[]) => void;
  setCurrentActiveGroup: (item: string[]) => void;
  verticalNavItems?: LayoutProps['verticalLayoutProps']['navMenu']['navItems'];
  grantType?: number;
}

export const resolveNavItemComponent = (
  item: NavGroup | NavLink | NavSectionTitle,
) => {
  if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle;
  if ((item as NavGroup).children) return VerticalNavGroup;

  return VerticalNavLink;
};

export const VerticalNavItems = (props: Props) => {
  const { verticalNavItems } = props;

  const RenderMenuItems = verticalNavItems?.map(
    (item: NavGroup | NavLink | NavSectionTitle, index: number) => {
      const TagName: any = resolveNavItemComponent(item);
      const requiredGrandType = item.grantType || 190;
      const currentGrantType = props.grantType || 10;

      if(currentGrantType < requiredGrandType) return null;

      return <TagName {...props} key={index} item={item} />;
    },
  );

  return <>{RenderMenuItems}</>;
};
