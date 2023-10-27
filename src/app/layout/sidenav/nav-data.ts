import { INavbarData } from "./inavbar.interface";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'assignment',
    label: 'General',
    items: [
      {
        routeLink: 'pages/companies',
        icon: 'apartment',
        label: 'Compañías',
      },
      {
        routeLink: 'dashboard',
        icon: 'store',
        label: 'Entidades',
      },
      {
        routeLink: 'dashboard',
        icon: 'local_mall',
        label: 'Productos',
      },
      {
        routeLink: 'dashboard',
        icon: 'phone_iphone',
        label: 'Dispositivos',
      },
      {
        routeLink: 'dashboard',
        icon: 'style',
        label: 'Tipo Licencias',
      },
      {
        routeLink: 'dashboard',
        icon: 'credit_card',
        label: 'Licencias',
      },
      {
        routeLink: 'dashboard',
        icon: 'local_atm',
        label: 'Pagos',
      },
      {
        routeLink: 'dashboard',
        icon: 'dashboard',
        label: 'CXC',
      },
    ]
  },
  {
  routeLink: 'dashboard',
  icon: 'admin_panel_settings',
  label: 'Administrar',
  items: [
    {
      routeLink: 'security/user-list',
      icon: 'group',
      label: 'Usuarios',
    },
    {
      routeLink: 'security/role-list',
      icon: 'manage_accounts',
      label: 'Roles',
    },
    {
      routeLink: 'security/menu-list',
      icon: 'menu',
      label: 'Menu',
    },
  ]
}


]

