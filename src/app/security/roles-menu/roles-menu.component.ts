import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuRole } from './interface/menu_rol.interface';
import { Subscription } from 'rxjs';
import { SecurityService } from '../security.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-roles-menu',
  templateUrl: './roles-menu.component.html',
  styleUrls: ['./roles-menu.component.scss']
})
export class RolesMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  getMenusRol$: Subscription = new Subscription();
  displayedColumns: string[] = ['menu', 'ver', 'crear', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<MenuRole>;
  isSpinnerLoading: Boolean = false;
  userRolID: string | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private securityService: SecurityService, private authService: AuthService) {
    this.dataSource = new MatTableDataSource();
    this.userRolID = localStorage.getItem('_rolID');
    console.log('this.userRolID>>>>>>>>>', this.userRolID);
  }

  ngOnInit(): void {
    this.getMenusRol$ = this.securityService.getMenuRol(this.userRolID).subscribe((res) => {
      console.log('res>>>>>>>>>>>>', res);

      this.dataSource = new MatTableDataSource(res.menuRoles);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getMenusRol$.unsubscribe();
    // this.deleteMenus$.unsubscribe();
  }
}
