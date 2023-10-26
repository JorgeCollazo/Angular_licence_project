import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { AuthData } from './authData.interface';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IMenu } from './menu.interface';

const BACKEND_URL = environment.apiURL + '/Auth/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string = '';
  private userID: string | null = null;
  private isAuthenticated: boolean = false;
  private authStatusSub = new Subject<boolean>();
  private menu: IMenu[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getUserID() {
    return this.userID;
  }

  getMenu() {
    return this.menu;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusSub() {
    return this.authStatusSub.asObservable();
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { User: email, Pwd: password}
    this.http.post<User>(BACKEND_URL + 'authenticate', authData)
    .subscribe({
      next: (res) => {
        const token = res.token;
        if(token) {
          this.userID = res.usuario.usuario_id
          this.menu = res.permisos
          this.isAuthenticated = true;
          this.authStatusSub.next(true);
          this.saveAuthData(token, this.userID, this.menu);
          this.router.navigate(['/navigation']);
        } else {
          this.authStatusSub.next(false);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error en el servidor'
          })
        }
      },
      error: (err) => {
        this.authStatusSub.next(false);
        console.log('err>>>>', err);
      },
    })
  }

  logoutUser() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusSub.next(false);
    this.router.navigate(['/login']);
    this.clearAuthData();
    this.userID = null;
  }

  saveAuthData(token: string, userID: string, menu: IMenu[]) {
    localStorage.setItem('_token', token);
    localStorage.setItem('_userID', userID);
    localStorage.setItem('_menu', this.encrypParm(menu));
  }
  
  public encrypParm(datos: any): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(datos))));
}

public decrypParm(datos: any): any {
  if (datos == undefined) return '';
  return JSON.parse(decodeURIComponent(escape(atob(datos))));
}

  clearAuthData() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_userID');
    localStorage.removeItem('_menu');
  }

}
