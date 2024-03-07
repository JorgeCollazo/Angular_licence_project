export interface Device {
  id_Disp: number;
  id_Tipo_Disp: number;
  serial: string;
  mac: string;
  sw_Activo: number;
  usuario_Id: number;
}


export interface ResponseDevice {
  success: boolean;
  message: string;
  errorNo: number;
  dispositivo: Device,
  dispositivos: Device[]
}

