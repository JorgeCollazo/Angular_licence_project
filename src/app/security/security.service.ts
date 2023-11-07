import { Injectable } from '@angular/core';
import { Menu } from './menus/interfaces/menu.intereface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { User } from './users/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  /* Menu Section */

  saveMenu(menu: Menu) {
    console.log('menu>>>>>', menu);
    
  }

  getMenu() {
    this.http.get(`${environment.apiURL}/Menu`)
    .subscribe(res => console.log('res>>>>', res));
  }


  /* Users Section */

  getUsers(): Observable<any> {
    const token = localStorage.getItem('_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<User>(`${environment.apiURL}/Usuario`, {headers: headers});
  }

}
