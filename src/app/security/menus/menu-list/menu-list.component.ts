import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuData } from './menu-data.interface';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../security.service';
import { Menu } from '../interfaces/menu.intereface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'orden',
    'nombre',
    'link',
    'nivel',
    'descripcion',
    'estado',
    'mostrar',
    'actions',
  ];
  dataSource: MatTableDataSource<Menu[]>;
  getMenus$: Subscription = new Subscription();
  deleteMenus$: Subscription = new Subscription();
  isSpinnerLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private securityService: SecurityService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getMenus$ = this.securityService.getMenu().subscribe((res) => {
      // this.parentsMenu = res.menus.filter((menu: Menu) => menu.padre == 0)
      this.dataSource = new MatTableDataSource(res.menus);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getMenus$.unsubscribe();
    this.deleteMenus$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(MenuDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getMenus$ = this.securityService.getMenu().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.menus);
      });
    });
  }

  deleteMenu(menu: Menu): void {
    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el menú: ${menu.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMenus$ = this.securityService.deleteMenu(menu.id_menu).subscribe({
          next: () => {
            this.toastr.success('Menu eliminado correctamente', 'Exito', {
              progressBar: true,
            });
            this.securityService.getMenu().subscribe((res) => {
              this.dataSource = new MatTableDataSource(res.menus);
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  editMenu(menu: Menu): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = menu;

    const dialogRefEdit =this.dialog.open(MenuDialogComponent, dialogConfig);

    dialogRefEdit.afterClosed().subscribe((result) => {
      this.getMenus$ = this.securityService.getMenu().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.menus);
      });
    });
  }
}
