export interface Status {
  nombre: string;
  cod: string;
  sw_activo: number;
  id_est: number;
  id_tpest: number;
}

export interface ResponseStatus {
  success: boolean;
  message: string;
  errorNo: number;
  estado: Status,
  estados: Status[]
}

