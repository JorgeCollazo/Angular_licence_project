import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { AuthData } from './interface/authData.interface';
import { HttpClient } from '@angular/common/http';
import { userLoginData } from './interface/userLoginData.interface';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Permission } from './interface/permissions.interface';
import { INavbarData } from '../layout/sidenav/inavbar.interface';

const BACKEND_URL = environment.apiURL + '/Auth/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string = '';
  private userID: number | null = null;
  private isAuthenticated: boolean = false;
  private authStatusSub = new Subject<boolean>();
  private menu$ = new Subject<Permission[]>();
  
  private transformedMenu: INavbarData[] = [];

  // private transformedMenu$ = new Subject<Boolean>();
  
  constructor(private http: HttpClient, private router: Router) { }
  
  getToken() {
    return this.token;
  }

  getUserID() {
    return this.userID;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  
  getMenuSub() {
    return this.menu$.asObservable();
  }
  
  // getTransformedMenuSub() {
  //   return this.transformedMenu$.asObservable();
  // }

  getAuthStatusSub() {
    return this.authStatusSub.asObservable();
  }

  loginUser(email: string, password: string) { 
    const authData: AuthData = { User: email, Pwd: password}
    this.http.post<userLoginData>(BACKEND_URL + 'authenticate', authData)
    .subscribe({
      next: (res) => {
        const token = res.token;
        if(token) {
          this.userID = res.usuario.usuario_id
          this.menu$.next(res.permisos);
          this.getTransformedMenu(res.permisos);
          this.isAuthenticated = true;
          this.authStatusSub.next(true);     
          this.saveAuthData(token, JSON.stringify(this.userID));
          this.router.navigate(['/navigation'])
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error en el servidor'
        })
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

  clearAuthData() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_userID');
    localStorage.removeItem('_menu');
  }

  saveAuthData(token: string, userID: string) {
    localStorage.setItem('_token', token);
    localStorage.setItem('_userID', userID);
  }

  saveMenu(menu: INavbarData) {
    localStorage.setItem('_menu', JSON.stringify(menu));
  }

  getTransformedMenu(menu: Permission[]): void {
    // const menuString = localStorage.getItem('_menu') ?? '';
    // this.menu = JSON.parse(menuString)
    console.log("this.menu>>>>>>>>>", menu);
    let organizedMenu: INavbarData[] = [];
    this.transformedMenu = menu.map((x:Permission) => {
      const menuItem: INavbarData = {
        routeLink: x.link,
        icon: 'dashboard',   // Change for x.icon when storing icon in DB
        label: x.menu,
        idmenu: x.idmenu,
        estado: x.estado,
        crear: x.crear,
        editar: x.editar,
        eliminar: x.eliminar,
        ver: x.ver,
        principal: x.principal,
        orden: x.orden,
        muestra: x.muestra,
        parentID: -1,            //Change for x.parentID,
        items: [],
      };
      return menuItem;
    })

    console.log('this.transformedMenu>>>>>>>>>>>>>', this.transformedMenu);
    organizedMenu = this.organizeArr(this.transformedMenu);
    localStorage.setItem('_menu', JSON.stringify(organizedMenu));
  }

  organizeArr(menu: INavbarData[]) {
    const organizedArr: INavbarData[] = [...menu];
    organizedArr[2].parentID=2;
    organizedArr[5].parentID=2;
    console.log('OriginalArray>>>>', menu);
    
    for(let i=0; i<organizedArr.length; i++) {

      if(organizedArr[i].parentID !== -1) {
        const parentFound = organizedArr.find(e => e.idmenu === organizedArr[i].parentID)
        if(parentFound) {
          const children: INavbarData[] = organizedArr.splice(i, 1);
          parentFound.items?.push(children[0]);
        }
      }
    }
    console.log('FinalArray>>>>', organizedArr);
    return organizedArr;
  }
}
