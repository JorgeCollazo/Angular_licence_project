export interface Subsidiary {
  subGrp_Id: number;
  entidad_Id: number;
  subGrp_Nombre: string;
}

export interface SubsidiaryDto {
  subGrp_Id: number;
  entidad_Id: number;
  grp_Ent_Id: number;
  subGrp_Nombre: string;
}

export interface ResponseSubsidiary {
  success: boolean;
  message: string;
  subGrpEntidad: SubsidiaryDto,
  subGrpEntidades: SubsidiaryDto[]
}
