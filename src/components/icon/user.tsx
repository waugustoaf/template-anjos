import { IconProps } from '@iconify/react';
import { Icon } from '.';


export const UserIcon = ({ icon, ...rest }: IconProps) => {
  return <Icon icon={icon} {...rest} />;
};
