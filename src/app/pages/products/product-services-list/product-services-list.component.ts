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
import { MatDialog } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-services-list',
  templateUrl: './product-services-list.component.html',
  styleUrls: ['./product-services-list.component.scss'],
})
export class ProductServicesListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = ['nombre', 'descripcion'];
  dataSource: MatTableDataSource<Service>;
  getServices$: Subscription = new Subscription();
  deleteCompany$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private pagesService: PagesService,
    private toastr: ToastrService,
    private router: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      const productId = params['id'];
      this.getServicesByProduct(productId);
    });


  }

  ngOnDestroy(): void {}

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
    this.getServices$ = this.pagesService.getServicesByProduct(id_product).subscribe({
      next: (res: ResponseService) => {
        if (!res.success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar la lista de servicios',
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
}
