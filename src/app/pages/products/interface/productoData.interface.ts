export interface Product {
  producto_Id: number;
  dispositivo_Id: number;
  nombre: string;
  descripcion: string;
  sw_Activo: number;
  usuario_Id: number;
  lic_Id: number;
  services_Id: string;
}

export interface ResponseProducto {
  success: boolean;
  message: string;
  errorNo: number;
  producto: Product,
  productos: Product[]
}

export interface ProductServicePrice {
  producto_Id: number;
  servicio_Id: number;
  monto: number;
  idproducto_servicio_precio: number;
}

