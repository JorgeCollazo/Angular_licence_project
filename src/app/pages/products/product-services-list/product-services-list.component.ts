import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  ResponseService,
  Service,
} from '../../services/interface/serviceData.interface';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServicesDialogComponent } from '../product-services-dialog/product-services-dialog.component';

@Component({
  selector: 'app-product-services-list',
  templateUrl: './product-services-list.component.html',
  styleUrls: ['./product-services-list.component.scss'],
})
export class ProductServicesListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = ['nombre', 'descripcion', 'monto', 'actions'];
  dataSource: MatTableDataSource<Service>;
  getServicesByProduct$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;
  productId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private pagesService: PagesService,
    private toastr: ToastrService,
    private routerActivated: ActivatedRoute,
    public router: Router,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getServicesByProduct$ = this.routerActivated.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.getServicesByProduct(this.productId);
    });
  }

  ngOnDestroy(): void {
    this.getServicesByProduct$.unsubscribe();
  }

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

  getServicesByProduct(id_product: number) {
    this.getServicesByProduct$ = this.pagesService.getServicesByProduct(id_product).subscribe({
      next: (res: ResponseService) => {
        if (!res.success) {
          Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'No existen servicios para este producto.',
          }).then((result) => {
            if(result.isConfirmed)
              this.go_back();
          });
        } else {
          this.dataSource = new MatTableDataSource(res.servicios);
          this.isSpinnerLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editAmount(service: Service) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {service: service, productID: this.productId};

    const dialogRefEdit = this.dialog.open(
      ProductServicesDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

        this.getServicesByProduct(this.productId);
    });
  }

  go_back() {
    this.router.navigate(['navigation/pages/products-list']);
  }
}
