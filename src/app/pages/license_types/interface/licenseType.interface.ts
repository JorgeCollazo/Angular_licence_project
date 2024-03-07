export interface LicenseType {
  nombre: string;
  descripcion: string;
  sw_Activo: number;
  usuario_Id: number;
  sw_Admin: number;
  sw_Mostrar: number;
  tipo_Lic_Id: number;
}

export interface ResponseLicenseType {
  success: boolean;
  message: string;
  errorNo: number;
  tipoLicencia: LicenseType,
  tipoLicencias: LicenseType[]
}

