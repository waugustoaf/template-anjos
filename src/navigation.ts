import { VerticalNavItemsType } from './types/app/layout';

export const VerticalNavItems = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/',
    },
    {
      title: 'Dashboard Administrativo',
      icon: 'tabler:smart-home',
      path: '/dash-admin',
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Produtos',
      icon: 'tabler:filter',
      path: '/products/list',
    },
    {
      title: 'Clientes',
      icon: 'tabler:filter',
      path: '/customers/list',
    },
    {
      title: 'Usuários',
      icon: 'tabler:filter',
      path: '/users/list',
    },
    {
      sectionTitle: 'Acompanhamento',
    },
    {
      title: 'Pipeline',
      icon: 'tabler:filter',
      path: '/pipeline',
    },
    {
      sectionTitle: 'Configurações',
    },
    {
      title: 'Funis de venda',
      icon: 'tabler:filter',
      path: '/sales-funnels/list',
    },
    {
      title: 'Estratégias de venda',
      icon: 'tabler:building-store',
      path: '/strategies/list',
    },
    {
      title: 'Estratégias do mês',
      icon: 'tabler:building-store',
      path: '/auto-pilot/list',
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Categorias',
      icon: 'tabler:stack-2',
      path: '/categories/list',
      // children: [
      //   {
      //     title: 'Clientes',
      //     path: '/dashboard/customers/list',
      //   },
      //   {
      //     title: 'Categorias',
      //     path: '/dashboard/customers/categories/list',
      //   },
      // ],
    },
    {
      title: 'Anjos',
      icon: 'tabler:user',
      path: '/angels/list',
    },
    {
      title: 'Clínicas',
      icon: 'tabler:building-store',
      path: '/clinics/list',
    },
    {
      title: 'Campanhas',
      icon: 'tabler:building-store',
      path: '/campaigns/list',
    },
  ];
};
