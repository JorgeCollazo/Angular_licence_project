import { User } from "src/app/security/users/interfaces/user.interface";
import { Permission } from "./permissions.interface";

export interface userLoginData {
  token: string;
  success: boolean;
  message: string;
  usuario: User;
  permisos: Permission[];
}
