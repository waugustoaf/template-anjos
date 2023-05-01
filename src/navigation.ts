import {VerticalNavItemsType} from './types/app/layout';

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
      title: 'Dashboard Administrativo',
      icon: 'tabler:dashboard',
      path: '/dashboard',
      grantType: USER_GRANT_TYPE.ANJO,
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Produtos',
      icon: 'tabler:stars',
      path: '/products/list',
      grantType: USER_GRANT_TYPE.CLINIC_GENERIC,
    },
    {
      title: 'Clientes',
      icon: 'tabler:mood-happy',
      path: '/customers/list',
      grantType: USER_GRANT_TYPE.CLINIC_GENERIC,
    },
    {
      title: 'Usuários',
      icon: 'tabler:users',
      path: '/user/list',
      grantType: USER_GRANT_TYPE.CLINIC_ADMIN,
    },
    {
      title: 'Tag',
      icon: 'tabler:tag',
      path: '/customer-tag/list',
      grantType: USER_GRANT_TYPE.CLINIC_GENERIC,
    },
    {
      sectionTitle: 'Operação',
    },
    {
      title: 'Campanhas',
      icon: 'tabler:sitemap',
      path: '/campaigns/list',
      grantType: USER_GRANT_TYPE.CLINIC_ADMIN,
    },
    {
      sectionTitle: 'Acompanhamento',
    },
    {
      title: 'Pipeline',
      icon: 'tabler:layout-kanban',
      path: '/campaigns/pipelines',
      grantType: USER_GRANT_TYPE.CLINIC_GENERIC,
    },
    {
      sectionTitle: 'Configurações',
    },
    {
      title: 'Funis de venda',
      icon: 'tabler:filter',
      path: '/sales-funnels/list',
      grantType: USER_GRANT_TYPE.ANJO_ADMIN,
    },
    {
      title: 'Estratégias de venda',
      icon: 'tabler:geometry',
      path: '/strategies/list',
      grantType: USER_GRANT_TYPE.ANJO_ADMIN,
    },
    {
      title: 'Piloto Automático',
      icon: 'tabler:calendar-plus',
      path: '/auto-pilot/list',
      grantType: USER_GRANT_TYPE.ANJO_ADMIN,
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Clínicas',
      icon: 'tabler:building-store',
      path: '/clinics/list',
      grantType: USER_GRANT_TYPE.ANJO,
    },
    {
      title: 'Categorias',
      icon: 'tabler:stack-2',
      path: '/categories/list',
      grantType: USER_GRANT_TYPE.ANJO_ADMIN,
    },
    {
      title: 'Anjos',
      icon: 'tabler:user',
      path: '/angels/list',
      grantType: USER_GRANT_TYPE.ANJO_ADMIN,
    },
  ];
};
