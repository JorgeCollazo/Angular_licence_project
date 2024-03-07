import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseSubsidiary, Subsidiary, SubsidiaryDto } from '../interface/subsidiary.interface';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { SubsidiariesDialogComponent } from '../subsidiaries-dialog/subsidiaries-dialog.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subsidiaries-list',
  templateUrl: './subsidiaries-list.component.html',
  styleUrls: ['./subsidiaries-list.component.scss']
})
export class SubsidiariesListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['subGrp_Nombre', 'entidad_Nombre', 'actions'];
  dataSource: MatTableDataSource<SubsidiaryDto>;
  getSubsidiaries$: Subscription = new Subscription();
  deleteSubsidiary$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getSubsidiaries$ = this.pagesService.getSubsidiaries().subscribe((res: ResponseSubsidiary) => {
      this.dataSource = new MatTableDataSource(res.subGrpEntidades);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getSubsidiaries$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSubsidiaryDialog(): void {
    const dialogRef = this.dialog.open(SubsidiariesDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubsidiaries$ = this.pagesService.getSubsidiaries().subscribe((res: ResponseSubsidiary) => {
        this.dataSource = new MatTableDataSource(res.subGrpEntidades);
      });
    });
  }

  editSubsidiary(subsidiary: Subsidiary) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = subsidiary;

    const dialogRefEdit = this.dialog.open(
      SubsidiariesDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {
      this.getSubsidiaries$ = this.pagesService.getSubsidiaries().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.subGrpEntidades);
      });
    });
  }

  deleteSubsidiary(subsidiary: Subsidiary) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar la sucursal: ${subsidiary.subGrp_Nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSubsidiary$ = this.pagesService.deleteSubsidiary(subsidiary.subGrp_Id).subscribe({
          next: () => {
            this.toastr.success('Sucursal eliminada correctamente', 'Exito', {
              progressBar: true,
            });
            this.pagesService.getSubsidiaries().subscribe((res) => {
              this.dataSource = new MatTableDataSource(res.subGrpEntidades);
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
