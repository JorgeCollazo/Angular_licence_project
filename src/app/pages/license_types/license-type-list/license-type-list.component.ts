import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LicenseTypeDialogComponent } from '../license-type-dialog/license-type-dialog.component';
import { LicenseType, ResponseLicenseType } from '../interface/licenseType.interface';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-license-type-list',
  templateUrl: './license-type-list.component.html',
  styleUrls: ['./license-type-list.component.scss']
})

export class LicenseTypeListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];
  dataSource: MatTableDataSource<LicenseType>;
  getLicenseTypes$: Subscription = new Subscription();
  deleteLicenseType$: Subscription = new Subscription();
  isSpinnerLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getLicenseTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getLicenseTypes$.unsubscribe();
    this.deleteLicenseType$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(LicenseTypeDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLicenseTypes();
    });
  }

  getLicenseTypes() {
    this.getLicenseTypes$ = this.pagesService.getLicenseType().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.tipoLicencias);
      this.isSpinnerLoading = false;
    });
  }

  editLicenseType(licenseType: LicenseType) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = licenseType;

    const dialogRefEdit = this.dialog.open(
      LicenseTypeDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getLicenseTypes();
    });
  }

  deleteLicenseType(licenseType: LicenseType) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el tipo de licencia: ${licenseType.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteLicenseType$ = this.pagesService.deleteLicenseType(licenseType.tipo_Lic_Id).subscribe({
          next: (res: ResponseLicenseType) => {
            if(res.success) {
              this.toastr.success('Tipo de licencia eliminada correctamente', 'Exito', {
                progressBar: true,
              });
              this.getLicenseTypes();
            }else if(!res.success && res.errorNo == 1451) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.message,
              })
            } else {
              this.toastr.error('No se pudo eliminar el tipo de licencia correctamente', 'Error', {
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
