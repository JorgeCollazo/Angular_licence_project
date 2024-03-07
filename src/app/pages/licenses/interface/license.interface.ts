export interface License {
  lic_Id: number;
  cod_Lic: string;
  tipo_Lic_Id: number;
  est_Id: number;
  usuario_Id: number;
}

export interface ResponseLicense {
  success: boolean;
  message: string;
  errorNo: number;
  licencia: License,
  licencias: License[]
}

