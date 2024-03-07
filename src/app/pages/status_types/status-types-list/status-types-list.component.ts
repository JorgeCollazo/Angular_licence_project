import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseStatusTypes, StatusType } from '../interface/status_license.interface';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { StatusTypesDialogComponent } from '../status-types-dialog/status-types-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-types-list',
  templateUrl: './status-types-list.component.html',
  styleUrls: ['./status-types-list.component.scss']
})
export class StatusTypesListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: MatTableDataSource<StatusType>;
  getStatusTypes$: Subscription = new Subscription();
  deleteStatusType$: Subscription = new Subscription();
  isSpinnerLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getStatusTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getStatusTypes$.unsubscribe();
    this.deleteStatusType$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(StatusTypesDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getStatusTypes();
    });
  }

  getStatusTypes() {
    this.getStatusTypes$ = this.pagesService.getStatusTypes().subscribe((res: ResponseStatusTypes) => {
      this.dataSource = new MatTableDataSource(res.tipoEstados);
      this.isSpinnerLoading = false;
    });
  }

  editStatusType(statusTypes: StatusType) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = statusTypes;

    const dialogRefEdit = this.dialog.open(
      StatusTypesDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getStatusTypes();
    });
  }

  deleteStatusType(statusType: StatusType) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el tipo de estado: ${statusType.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStatusType$ = this.pagesService.deleteStatusType(statusType.iD_Tpest).subscribe({
          next: (res: ResponseStatusTypes) => {
            if(res.success) {
              this.toastr.success('Tipo de estado eliminado correctamente', 'Exito', {
                progressBar: true,
              });
              this.getStatusTypes();
            } else if(!res.success && res.errorNo == 1451) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.message,
              })
            } else {
              this.toastr.error('No se pudo eliminar el tipo de estado correctamente', 'Error', {
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
