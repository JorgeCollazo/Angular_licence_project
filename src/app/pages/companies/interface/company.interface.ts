export interface Company {
  grp_Ent_Id: number;
  grp_Nombre: string;
  sw_Activo: number;
}

export interface ResponseCompany {
  success: boolean;
  message: string;
  errorNo: number;
  grupoEntidad: Company,
  grupoEntidades: Company[]
}

