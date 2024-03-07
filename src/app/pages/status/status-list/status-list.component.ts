import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseStatus, Status } from '../interface/status.interface';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'code', 'status', 'actions'];
  dataSource: MatTableDataSource<Status>;
  getStatus$: Subscription = new Subscription();
  deleteStatus$: Subscription = new Subscription();
  isSpinnerLoading: boolean = false;
  isEditing: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getStatus();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getStatus$.unsubscribe();
    this.deleteStatus$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getStatus();
    });
  }

  getStatus() {
    this.getStatus$ = this.pagesService.getStatus().subscribe((res: ResponseStatus) => {
      this.dataSource = new MatTableDataSource(res.estados);
      this.isSpinnerLoading = false;
    });
  }

  editStatus(status: Status) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = status;

    const dialogRefEdit = this.dialog.open(
      StatusDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getStatus();
    });
  }

  deleteStatus(status: Status) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el estado: ${status.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStatus$ = this.pagesService.deleteStatus(status.id_est).subscribe({
          next: (res: ResponseStatus) => {
            if(res.success) {
              this.toastr.success('Estado eliminado correctamente', 'Exito', {
                progressBar: true,
              });
              this.getStatus();
            } else if(!res.success && res.errorNo == 1451) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.message,
              })
            } else {
              this.toastr.error('No se pudo eliminar el estado correctamente', 'Error', {
                progressBar: true,
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

}
