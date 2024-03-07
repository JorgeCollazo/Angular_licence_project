export interface StatusType {
  nombre: string;
  descripcion: string;
  usuario_Id: number;
  iD_Tpest: number;
}

export interface ResponseStatusTypes {
  success: boolean;
  message: string;
  errorNo: number;
  tipoEstado: StatusType,
  tipoEstados: StatusType[]
}

