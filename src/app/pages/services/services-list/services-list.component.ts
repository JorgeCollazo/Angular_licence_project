import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from '../interface/serviceData.interface';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { ServicesDialogComponent } from '../services-dialog/services-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['nombre', 'descripcion', 'status', 'actions'];
  dataSource: MatTableDataSource<Service>;
  getServices$: Subscription = new Subscription();
  deleteCompany$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getServices$ = this.pagesService.getServices().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.servicios);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getServices$.unsubscribe();
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
    const dialogRef = this.dialog.open(ServicesDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getServices$ = this.pagesService.getServices().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.servicios);
        this.isSpinnerLoading = false;
      });
    });
  }

  editService(service: Service) {}

  deleteService(service: Service) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el servicio: ${service.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCompany$ = this.pagesService
          .deleteService(service.servicio_Id)
          .subscribe({
            next: () => {
              this.toastr.success('Servicio eliminado correctamente', 'Exito', {
                progressBar: true,
              });
              this.pagesService.getServices().subscribe((res) => {
                this.dataSource = new MatTableDataSource(res.grupoEntidades);
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
