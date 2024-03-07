import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeviceType, DeviceTypeResponse } from '../interface/device_type.interface';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Device } from '../../devices/interface/device.interface';

@Component({
  selector: 'app-device-type-dialog',
  templateUrl: './device-type-dialog.component.html',
  styleUrls: ['./device-type-dialog.component.scss']
})
export class DeviceTypeDialogComponent implements OnInit, OnDestroy {

  deviceTypeDialogForm: FormGroup;
  disableClose: boolean = false;
  deviceTypes: DeviceType[] = [];
  isSelectDisabled: boolean = true;
  userID: number;
  editDeviceType$: Subscription = new Subscription();
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeviceTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceType,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.userID = Number(localStorage.getItem('_userID'));
    this.isEditing = !!data;

    this.deviceTypeDialogForm = fb.group({
      nombre: [data ? data.nombre : ''],
      descripcion: [data ? data.descripcion : ''],
      activeChbx: [data ? data.sw_Activo : false]
    });
  }

  ngOnInit(): void {
    this.pagesService.getDeviceTypes().subscribe((res: DeviceTypeResponse) => {
      this.deviceTypes = res.tipoDispositivos;
    })
  }

  ngOnDestroy(): void {
    this.editDeviceType$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.deviceTypeDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<DeviceType> = {
        nombre: this.deviceTypeDialogForm.value.nombre,
        descripcion: this.deviceTypeDialogForm.value.descripcion,
        sw_Activo: Number(this.deviceTypeDialogForm.value.activeChbx),
        usuario_Id: this.userID,
      }
      this.pagesService.saveDeviceType(dataDialog)
        .subscribe({
          next: (response) => {
            if(response.success) {
              this.toastr.success('Tipo de dispositivo añadido correctamente', 'Exito', {progressBar: true});
              this.dialogRef.close({isRefreshing: true});
            } else {
              this.toastr.error('No ha sido posible añadir el tipo de dispositivo', 'Error', {progressBar: true});
            }
          },
          error: () => {
            this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
          },
      })
    }
  }

  editDeviceType() {

    const dataDialog: DeviceType = {
      nombre: this.deviceTypeDialogForm.value.nombre,
      descripcion: this.deviceTypeDialogForm.value.descripcion,
      sw_Activo: Number(this.deviceTypeDialogForm.value.activeChbx),
      usuario_Id: this.userID,
      iD_Tipo_Disp: this.data.iD_Tipo_Disp
    };
    this.editDeviceType$ = this.pagesService.editDeviceType(dataDialog)
    .subscribe({
      next: (response: DeviceTypeResponse) => {
        if(response.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.dialogRef.close({isRefreshing: true});
        } else {
          this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
        }
      },
      error: () => {

      },
    })
  }

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

}
