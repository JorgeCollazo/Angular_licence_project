import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeviceType, DeviceTypeResponse } from '../interface/device_type.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceTypeDialogComponent } from '../device-type-dialog/device-type-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-type-list',
  templateUrl: './device-type-list.component.html',
  styleUrls: ['./device-type-list.component.scss']
})
export class DeviceTypeListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['nombre', 'descripcion', 'status', 'actions'];
  dataSource: MatTableDataSource<DeviceType>;
  getDevice_types$: Subscription = new Subscription();
  deleteDevice_types$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
   this.getDeviceTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getDevice_types$.unsubscribe();
    this.deleteDevice_types$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEntityDialog(): void {
    const dialogRef = this.dialog.open(DeviceTypeDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDeviceTypes();
    });
  }

  getDeviceTypes() {
    this.getDevice_types$ = this.pagesService.getDeviceTypes()
    .subscribe({
      next: (res: DeviceTypeResponse) => {
        if(res.tipoDispositivos.length == 0 && res.success) {
          this.dataSource = new MatTableDataSource(res.tipoDispositivos);
          Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'No existen tipos de dispositivos aún ',
          })
        } else if(!res.success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error en el servidor',
          });
        } else {
          this.dataSource = new MatTableDataSource(res.tipoDispositivos);
          this.isSpinnerLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editDeviceType(device_type: DeviceType) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = device_type;

    const dialogRefEdit = this.dialog.open(
      DeviceTypeDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {

      if(!result.isRefreshing)
        return;

      this.getDeviceTypes();
    });
  }

  deleteDeviceType(device_type: DeviceType) {
    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el tipo: ${device_type.nombre}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDevice_types$ = this.pagesService
          .deleteDeviceType(device_type.iD_Tipo_Disp)
          .subscribe({
            next: (response: DeviceTypeResponse) => {
              if(response.success) {
                this.toastr.success('Tipo de dispositivo eliminado correctamente', 'Exito', {
                  progressBar: true,
                });
                this.getDeviceTypes();
              } else if(!response.success && response.errorNo == 1451) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: response.message,
                })
              } else {
                this.toastr.error('No se pudo eliminar el tipo de dispositivo', 'Error', {
                  progressBar: true,
                });
              }
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
    });
  }
}
