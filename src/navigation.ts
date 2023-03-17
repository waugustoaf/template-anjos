import { VerticalNavItemsType } from "./types/app/layout";

export const VerticalNavItems = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/',
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
      title: 'Funis de venda',
      icon: 'tabler:filter',
      path: '/sales-funnels/list',
    },
    {
      title: 'Anjos',
      icon: 'tabler:user',
      path: '/angels/list',
    },
  ];
};
