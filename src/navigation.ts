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
      path: '/dashboard',
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
      title: 'Tag',
      icon: 'tabler:tag',
      path: '/customer-tag/list',
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
      path: '/campaigns/9de46756-e26a-411a-87b3-102333285ca0/boards/d53d4443-4f1a-43c9-bdc9-512734c290c7',
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
      title: 'Piloto Automático',
      icon: 'tabler:calendar-plus',
      path: '/auto-pilot/list',
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Clínicas',
      icon: 'tabler:building-store',
      path: '/clinics/list',
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
  ];
};
