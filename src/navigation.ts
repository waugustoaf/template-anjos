import { VerticalNavItemsType } from './types/app/layout';

export const VerticalNavItems = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:gauge',
      path: '/',
    },
    {
      title: 'Dashboard Administrativo',
      icon: 'tabler:dashboard',
      path: '/dash-admin',
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Produtos',
      icon: 'tabler:stars',
      path: '/products/list',
    },
    {
      title: 'Clientes',
      icon: 'tabler:mood-happy',
      path: '/customers/list',
    },
    {
      title: 'Usuários',
      icon: 'tabler:users',
      path: '/user/list',
    },
    {
      sectionTitle: 'Operação',
    },
    {
      title: 'Campanhas',
      icon: 'tabler:sitemap',
      path: '/campaigns/list',
    },
    {
      sectionTitle: 'Acompanhamento',
    },
    {
      title: 'Pipeline',
      icon: 'tabler:layout-kanban',
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
      icon: 'tabler:geometry',
      path: '/strategies/list',
    },
    {
      title: 'Estratégias do mês',
      icon: 'tabler:calendar-plus',
      path: '/auto-pilot/list',
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Categorias',
      icon: 'tabler:stack-2',
      path: '/categories/list',
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
  ];
};
