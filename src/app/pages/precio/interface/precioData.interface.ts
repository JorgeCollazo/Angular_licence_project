export interface Price {
    id_Precio: number;
    nombre: string;
    descripcion: string;
    monto: number;
    sw_Activo: number;
    usuario_Id: number;
  }

  export interface ResponsePrice {
    success: boolean;
    message: string;
    errorNo: number;
    precio: Price,
    precios: Price[]
  }

