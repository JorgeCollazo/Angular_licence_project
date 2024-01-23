export interface License {
  lic_Id: number;
  cod_Lic: string;
  ent_Id: number;
  tipo_Lic_Id: number;
  est_Id: number;
  usuario_Id: number;
}

export interface ResponseLicenses {
  success: boolean;
  message: string;
  errorNo: number;
  licencia: License,
  licencias: License[]
}

