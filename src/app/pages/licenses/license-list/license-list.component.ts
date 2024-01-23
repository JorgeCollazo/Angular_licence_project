import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from 'src/app/security/users/user-list/user-data.interface';
import { LicenseDialogComponent } from '../license-dialog/license-dialog.component';
import { License } from '../interface/license.interface';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.scss']
})

export class LicenseListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['cod_Lic', 'actions'];
  dataSource: MatTableDataSource<License>;
  getLicenses$: Subscription = new Subscription();
  deleteLicense$: Subscription = new Subscription();
  isSpinnerLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getLicenses$ = this.pagesService.getLicenses().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.licencias);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getLicenses$.unsubscribe();
    this.deleteLicense$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(LicenseDialogComponent, {
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editLicense(license: License) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = license;

    const dialogRefEdit = this.dialog.open(
      LicenseDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getLicenses$ = this.pagesService.getLicenses().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.licencias);
      });
    });
  }

  deleteLicense(license: License) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar la licencia: ${license.cod_Lic}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteLicense$ = this.pagesService.deleteLicense(license.lic_Id).subscribe({
          next: () => {
            this.toastr.success('Licencia eliminada correctamente', 'Exito', {
              progressBar: true,
            });
            this.pagesService.getLicenses().subscribe((res) => {
              this.dataSource = new MatTableDataSource(res.licencias);
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
