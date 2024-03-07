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
import { UserData } from 'src/app/security/users/user-list/user-data.interface';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';
import { Device, ResponseDevice } from '../interface/device.interface';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DeviceTypeResponse } from '../../device_types/interface/device_type.interface';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['serial', 'mac', 'nombre_Tipo_Disp', 'status', 'actions'];
  dataSource: MatTableDataSource<Device>;
  getDevices$: Subscription = new Subscription();
  deleteDevice$: Subscription = new Subscription();
  isSpinnerLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getDevices();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getDevices$.unsubscribe();
    this.deleteDevice$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDevices();
    });
  }

  getDevices() {
    this.getDevices$ = this.pagesService.getDevices().subscribe({
      next: (res: ResponseDevice) => {
        if (res.dispositivos.length == 0 && res.success) {
          this.dataSource = new MatTableDataSource(res.dispositivos);
          Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'No existen dispositivos aún',
          });
        } else if(!res.success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error en el servidor',
          });
        } else {
            this.dataSource = new MatTableDataSource(res.dispositivos);
            this.isSpinnerLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editDevice(device: Device) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = device;

    const dialogRefEdit = this.dialog.open(DeviceDialogComponent, dialogConfig);

    dialogRefEdit.afterClosed().subscribe((result) => {
      if (!result.editing) return;

      this.getDevices();
    });
  }

  deleteDevice(device: Device) {
    Swal.fire({
      icon: 'warning',
      title: 'Alerta',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      text: `Está seguro de querer eliminar el dispositivo: ${device.serial}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDevice$ = this.pagesService
          .deleteDevice(device.id_Disp)
          .subscribe({
            next: (res: DeviceTypeResponse) => {
              if(res.success) {
                this.toastr.success('Dispositivo eliminado correctamente', 'Exito', {
                  progressBar: true,
                });
                this.getDevices();
              } else if(!res.success && res.errorNo == 1451) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: res.message,
                })
              } else {
                this.toastr.error('No se pudo eliminar el dispositivo correctamente', 'Error', {
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
