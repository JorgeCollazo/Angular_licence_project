import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EntitiesDialogComponent } from '../entities-dialog/entities-dialog.component';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import { Entity, EntityDto, ResponseEntity } from '../interface/entity.interface';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss']
})
export class EntitiesListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['enT_Nombre', 'grp_Ent_Nombre', 'status', 'actions'];
  dataSource: MatTableDataSource<EntityDto>;
  getEntities$: Subscription = new Subscription();
  deleteEntity$: Subscription = new Subscription();
  isSpinnerLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getEntities$ = this.pagesService.getEntities().subscribe((res: ResponseEntity) => {
      this.dataSource = new MatTableDataSource(res.entidades);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getEntities$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(EntitiesDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEntities$ = this.pagesService.getEntities().subscribe((res: ResponseEntity) => {
        this.dataSource = new MatTableDataSource(res.entidades);
      });
    });
  }

  deleteEntity(entity: EntityDto) {

    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar la entidad: ${entity.enT_Nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEntity$ = this.pagesService.deleteEntity(entity.enT_ID).subscribe({
          next: (response: ResponseEntity) => {
            if(response.success) {
              this.toastr.success('Entidad eliminada correctamente', 'Exito', {
                progressBar: true,
              });
              this.pagesService.getEntities().subscribe((res) => {
                this.dataSource = new MatTableDataSource(res.entidades);
              });
            } else if(!response.success && response.errorNo == 1451) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.message,
              })
            } else {
              this.toastr.error('No se pudo eliminar la entidad correctamente', 'Error', {
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

  editEntity(entity: EntityDto) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = entity;

    const dialogRefEdit = this.dialog.open(
      EntitiesDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getEntities$ = this.pagesService.getEntities().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.entidades);
      });
    });
  }

}
