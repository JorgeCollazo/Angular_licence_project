import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Product, ResponseProducto } from '../interface/productoData.interface';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import {MatTooltipModule} from '@angular/material/tooltip';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'description', 'lic_nombre', 'status', 'services', 'actions'];
  dataSource: MatTableDataSource<Product>;
  getProductos$: Subscription = new Subscription();
  deleteProducto$: Subscription = new Subscription();
  isSpinnerLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private pagesService: PagesService,
    public router: Router,
    private toastr: ToastrService) {

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getProductos$.unsubscribe();
    this.deleteProducto$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductos$ = this.pagesService.getProductos().subscribe((res: ResponseProducto) => {
        this.dataSource = new MatTableDataSource(res.productos);
      });
    });
  }

  getProducts() {

    this.getProductos$ = this.pagesService.getProductos()
    .subscribe({
      next: (res: ResponseProducto) => {
        if(!res.success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar la lista de productos',
          })
        } else {
          this.dataSource = new MatTableDataSource(res.productos);
            this.isSpinnerLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(product: Product) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de eliminar el producto: ${product.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProducto$ = this.pagesService.deleteProduct(product.producto_Id).subscribe({
          next: () => {
            this.toastr.success('Producto eliminado correctamente', 'Exito', {
              progressBar: true,
            });
            this.pagesService.getProductos().subscribe((res: ResponseProducto) => {
              this.dataSource = new MatTableDataSource(res.productos);
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  editProduct(product: Product) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = product;

    const dialogRefEdit = this.dialog.open(
      ProductDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.editing)
        return;

      this.getProductos$ = this.pagesService.getProductos().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.productos);
      });
    });
  }

  show_Services(product: Product) {
    this.router.navigate(['navigation/pages/product-service-list'], {queryParams: {id: product.producto_Id}});
  }

}
