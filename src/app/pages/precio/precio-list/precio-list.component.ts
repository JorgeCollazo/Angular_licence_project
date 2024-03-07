import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PriceData } from '../interface/precioData.interface';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { PrecioDialogComponent } from '../precio-dialog/precio-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-precio-list',
  templateUrl: './precio-list.component.html',
  styleUrls: ['./precio-list.component.scss']
})
export class PrecioListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['nombre', 'status', 'actions'];
  dataSource: MatTableDataSource<PriceData>;
  getPrices$: Subscription = new Subscription();
  deletePrice$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getPrices$ = this.pagesService.getPrices().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.precios);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getPrices$.unsubscribe();
    this.getPrices$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEntityDialog(): void {
    const dialogRef = this.dialog.open(PrecioDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getPrices$ = this.pagesService.getPrices().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.precios);
      });
    });
  }

  editPrice(precio: PriceData) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = precio;

    const dialogRefEdit = this.dialog.open(
      PrecioDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getPrices$ = this.pagesService.getPrices().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.precios);
      });
    });
  }

  deletePrice(precio: PriceData) {
    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el precio: ${precio.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePrice$ = this.pagesService
          .deletePrice(precio.id_Precio)
          .subscribe({
            next: () => {
              this.toastr.success('Precio eliminado correctamente', 'Exito', {
                progressBar: true,
              });
              this.pagesService.getPrices().subscribe((res) => {
                this.dataSource = new MatTableDataSource(res.precios);
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
