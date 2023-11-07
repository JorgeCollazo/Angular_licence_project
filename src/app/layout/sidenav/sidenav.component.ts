import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/auth/auth.service';
import { INavbarData } from './inavbar.interface';
import { Permission } from 'src/app/auth/interface/permissions.interface';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  collapsed: boolean = false;
  navData = navbarData;
  // navData: INavbarData[] = [];
  multiple: boolean = false;
  menu: Permission[] = [];

  constructor(private authService: AuthService) {
    const menuString = localStorage.getItem('_menu') ?? '';
    // this.navData = JSON.parse(menuString);
  }

  onLogout() {
    this.authService.logoutUser();
  }

  handleClick(item: INavbarData): void {
    if(!this.multiple) {
      for(let modelItem of this.navData) {
        if(item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

}
