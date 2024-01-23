import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../security.service';
import { Role } from '../interfaces/role.interface';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['nombre', 'descripcion', 'status', 'actions'];
  dataSource: MatTableDataSource<Role>;
  isSpinnerLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getRoles$: Subscription = new Subscription();
  deleteRol$: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private securityService: SecurityService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getRoles$ = this.securityService.getRoles().subscribe((res) => {
      // this.parentsMenu = res.menus.filter((menu: Menu) => menu.padre == 0)
      this.dataSource = new MatTableDataSource(res.roles);
      this.isSpinnerLoading = false;
    });
  }

  ngOnDestroy(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRolesDialog(): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getRoles$ = this.securityService.getRoles().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.roles);
      });
    });
  }

  editRol(rol: Role) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = rol;

    const dialogRefEdit =this.dialog.open(RoleDialogComponent, dialogConfig);

    dialogRefEdit.afterClosed().subscribe((result) => {
      this.getRoles$ = this.securityService.getRoles().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.roles);
      });
    });
  }

  deleteRol(rol: Role) {
    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el rol: ${rol.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRol$ = this.securityService
          .deleteRol(rol)
          .subscribe({
            next: () => {
              this.toastr.success('Rol eliminado correctamente', 'Exito', {
                progressBar: true,
              });
              this.securityService.getRoles().subscribe((res) => {
                this.dataSource = new MatTableDataSource(res.roles);
              });
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  asignPermissions() {
    
  }
}
