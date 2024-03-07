export interface Service {
  servicio_Id: number;
  nombre: string;
  descripcion: string;
  sw_Activo: number;
  usuario_Id: number;
  producto_Id: number;
}


export interface ResponseService {
  success: boolean;
  message: string;
  errorNo: number;
  servicio: Service,
  servicios: Service[]
}

