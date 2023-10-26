import { Component, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/auth/auth.service';
import { INavbarData } from './inavbar.interface';
import { IMenu } from 'src/app/auth/menu.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  collapsed: boolean = false;
  // navData = navbarData;
  navData: IMenu[] = [];
  multiple: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.navData = navbarData;
    this.navData = this.authService.decrypParm(localStorage.getItem('_menu'));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  // handleClick(item: INavbarData): void {
  //   if(!this.multiple) {
  //     for(let modelItem of this.navData) {
  //       if(item !== modelItem && modelItem.expanded) {
  //         modelItem.expanded = false;
  //       }
  //     }
  //   }
  //   item.expanded = !item.expanded;
  // }

}
