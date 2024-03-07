export interface Entity {
  mant_ent_id: number;
  mant_grp_id: number;
  mant_nombre: string;
  mant_activo: number;
}

export interface EntityDto {
    enT_ID: number;
    grP_ID: number;
    enT_Nombre: string;
    grp_Ent_Nombre: string;
    sw_Activo: true,
}

export interface ResponseEntity {
  success: boolean;
  errorNo: number;
  message: string;
  entidad: EntityDto,
  entidades: EntityDto[]
}
