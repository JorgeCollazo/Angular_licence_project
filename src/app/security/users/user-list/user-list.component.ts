import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { SecurityService } from '../../security.service';
import { User } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['email', 'cedula', 'rol', 'estado', 'actions'];
  dataSource: MatTableDataSource<User>;

  private users$: Subscription = new Subscription();
  private deleteUsuario$: Subscription = new Subscription();

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
    this.users$ = this.securityService.getUsers()
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users.usuarios);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
    this.deleteUsuario$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.users$ = this.securityService.getUsers().subscribe((users) => {
        this.dataSource = new MatTableDataSource(users.usuarios);
      });
    });
  }

  deleteUsuario(usuario: User): void {

      Swal.fire({
        icon: 'warning',
        title: 'Alerta',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        text: `Está seguro de querer eliminar el usuario: ${usuario.email}?`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUsuario$ = this.securityService.deleteUser(usuario.usuario_id).subscribe({
            next: () => {
              this.toastr.success('Usuario eliminado correctamente', 'Exito', {
                progressBar: true,
              });
              this.users$ = this.securityService.getUsers().subscribe((res) => {
                this.dataSource = new MatTableDataSource(res.usuarios);
              });
            },
            error: (err) => {
              this.toastr.error(`Error al eliminar el usuario ${usuario.email}`, 'Exito', {
                progressBar: true,
              });
              console.log(err);
            },
          });
        }
      });
    }

    editUser(user: User): void {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;
      dialogConfig.data = user;

      const dialogRefEdit = this.dialog.open(UserDialogComponent, dialogConfig);

      dialogRefEdit.afterClosed().subscribe((result) => {
        this.users$ = this.securityService.getUsers().subscribe((res) => {
          this.dataSource = new MatTableDataSource(res.usuarios);
        });
      });
    }
  }
