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
import { CompaniesDialogComponent } from '../companies-dialog/companies-dialog.component';
import { Company, ResponseCompany } from '../interface/company.interface';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
})
export class CompaniesListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = ['nombre', 'status', 'actions'];
  dataSource: MatTableDataSource<Company>;
  getCompanies$: Subscription = new Subscription();
  deleteCompany$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getCompanies$.unsubscribe();
    this.deleteCompany$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEntityDialog(): void {
    const dialogRef = this.dialog.open(CompaniesDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
     this.getCompanies();
    });
  }

  getCompanies() {
    this.getCompanies$ = this.pagesService.getCompanies().subscribe((res: ResponseCompany) => {
      this.dataSource = new MatTableDataSource(res.grupoEntidades);
      this.isSpinnerLoading = false;
    });
  }

  editCompany(company: Company) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = company;

    const dialogRefEdit = this.dialog.open(
      CompaniesDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getCompanies();
    });
  }

  deleteCompany(company: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar la compañía: ${company.grp_Nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCompany$ = this.pagesService
          .deleteCompany(company.grp_Ent_Id)
          .subscribe({
            next: (response: ResponseCompany) => {
              if(response.success) {
                this.toastr.success('Compañía eliminada correctamente', 'Exito', {
                  progressBar: true,
                });
                this.getCompanies();
              } else if(!response.success && response.errorNo == 1451) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: response.message,
                })
              } else {
                this.toastr.error('No se pudo eliminar la compañía correctamente', 'Error', {
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
