import { Injectable } from '@angular/core';
import { Menu } from './menus/interfaces/menu.intereface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { User } from './users/interfaces/user.interface';
import { Role } from './roles/interfaces/role.interface';
import Swal from 'sweetalert2';
import { MenuRole } from './roles-menu/interface/menu_rol.interface';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }


  setHeadersAuth() {
    const token = localStorage.getItem('_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return headers;
  }

  /**************************** Menu Section ****************************/

  saveMenu(menu: Menu): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/Menu`, menu, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar el menu';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  editMenu(menu: Menu): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/Menu/${menu.id_menu}`, menu, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el menu';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  getMenu(): Observable<any>{

    const headers = this.setHeadersAuth();

    return this.http.get<{menu: Menu[]}>(`${environment.apiURL}/Menu`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de menus';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteMenu(id_menu: Number): Observable<any> {
    const headers = this.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Menu/${id_menu}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el menu seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
  )}

  /**************************** Users Section ***************************/

  getUsers(): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.get<User[]>(`${environment.apiURL}/Usuario`, {headers: headers});
  }

  saveUser(user: Partial<User>): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/Usuario`, user, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar el usuario';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteUser(user_id: number): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Usuario/${user_id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el usuario seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
  )
}

  editUser(user: Partial<User>): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/Usuario/${user.usuario_id}`, user, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el usuario';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  /*************************** Role Section ***************************/

  getRoles(): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.get<Role[]>(`${environment.apiURL}/Rol`, {headers: headers});
  }

  saveRol(rol: Role): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/Rol`, rol, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar el rol';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteRol(rol: Role): Observable<any> {

    const headers = this.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/rol/${rol.rol_id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el rol seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
  }

  editRol(rol: Role): Observable<any> {

    const headers = this.setHeadersAuth();
    console.log('rol>>>>>>>', rol);

    return this.http.put(`${environment.apiURL}/Rol/${rol.rol_id}`, rol, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el rol';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  getMenuRol(rolID: string | null): Observable<any> {

    const headers = this.setHeadersAuth();
    return this.http.get<MenuRole[]>(`${environment.apiURL}/MenuRol/menu-rol-ByRol/${rolID}`, {headers: headers});

  }

}
