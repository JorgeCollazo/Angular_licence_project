export interface INavbarData {
  routeLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  idmenu: number,
  estado: number,
  crear: number,
  editar: number,
  eliminar: number,
  ver: number,
  principal: number,
  orden: number,
  muestra: number,
  parentID: number,
  items?: INavbarData[];
}
