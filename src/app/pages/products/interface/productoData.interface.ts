export interface Product {
  producto_Id: number;
  nombre: string;
  descripcion: string;
  sw_Activo: number;
  usuario_Id: number;
  tipo_Lic_Id: number;
}

export interface ResponseProducto {
  success: boolean;
  message: string;
  errorNo: number;
  producto: Product,
  productos: Product[]
}

