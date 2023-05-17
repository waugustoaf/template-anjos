import { VerticalNavItemsType } from './types/app/layout';

export const USER_GRANT_TYPE = {
  CLINIC_GENERIC: 10,
  CLINIC_ADMIN: 90,
  ANJO: 100,
  ANJO_ADMIN: 190,
};

export const VerticalNavItems = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:gauge',
      path: '/',
      grantType: USER_GRANT_TYPE.CLINIC_GENERIC,
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Usuários',
      icon: 'tabler:users',
      path: '/users/list',
      grantType: USER_GRANT_TYPE.CLINIC_GENERIC,
    },
  ];
};
