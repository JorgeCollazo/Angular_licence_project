export interface DeviceType {
  iD_Tipo_Disp: number;
  nombre: string;
  descripcion: string;
  sw_Activo: number;
  usuario_Id: number;
}

export interface DeviceTypeResponse {
  success: boolean;
  message: string;
  errorNo: number;
  tipoDispositivo: DeviceType,
  tipoDispositivos: DeviceType[]
}
