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
      title: 'Clientes',
      icon: 'tabler:user',
      children: [
        {
          title: 'Clientes',
          path: '/dashboard/customers/list',
        },
        {
          title: 'Categorias',
          path: '/dashboard/customers/categories/list',
        },
      ],
    },
    {
      title: 'Fornecedores',
      icon: 'tabler:truck-delivery',
      path: '/dashboard/suppliers/list',
    },
    {
      title: 'Serviços',
      icon: 'tabler:tools',
      children: [
        {
          title: 'Serviços',
          icon: 'tabler:tools',
          path: '/dashboard/services/list',
        },
        {
          title: 'Categorias',
          path: '/dashboard/services/categories/list',
        },
      ],
    },
    {
      title: 'Produtos',
      icon: 'tabler:package',
      children: [
        {
          title: 'Produtos',
          path: '/dashboard/products/list',
          icon: 'tabler:package',
        },
        {
          title: 'Marcas',
          path: '/dashboard/brands/list',
          icon: 'tabler:trademark',
        },
        {
          title: 'Categorias',
          path: '/dashboard/products/categories/list',
        },
      ],
    },
    {
      sectionTitle: 'Financeiro',
    },
    {
      title: 'Contas a pagar',
      icon: 'tabler:receipt',
      path: '/dashboard/financial/to-pay',
    },
    {
      title: 'Contas a receber',
      icon: 'tabler:receipt-refund',
      path: '/dashboard/financial/to-receive',
    },
    {
      title: 'Vendas',
      icon: 'tabler:shopping-cart',
      path: '/dashboard/financial/sales',
    },
    {
      title: 'Fechamento de caixa',
      icon: 'tabler:cash',
      path: '/dashboard/financial/cash-closing',
    },
    {
      sectionTitle: 'Estoque',
    },
    {
      title: 'Entrada de mercadorias',
      icon: 'tabler:arrow-bar-right',
      path: '/dashboard/stock/commodity',
    },
    {
      sectionTitle: 'Configurações',
    },
    {
      title: 'Dados da empresa',
      icon: 'tabler:receipt',
      path: '/dashboard/config/company',
    },
    {
      title: 'Unidades de medida',
      icon: 'tabler:ruler-2',
      path: '/dashboard/config/unit-of-measurement',
    },
    {
      title: 'Usuários',
      icon: 'tabler:users',
      path: '/dashboard/config/users',
    },
    {
      title: 'Contas bancárias',
      icon: 'tabler:building-bank',
      path: '/dashboard/config/accounts/list',
    },
    {
      title: 'Protocolos',
      icon: 'tabler:cash',
      path: '/dashboard/config/protocols/list',
    },
    {
      title: 'Formas de pagamento',
      icon: 'tabler:cash',
      path: '/dashboard/config/payment-methods/list',
    },
  ];
};
