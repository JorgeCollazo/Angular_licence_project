import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { Device, ResponseDevice } from '../interface/device.interface';
import { DeviceType, DeviceTypeResponse } from '../../device_types/interface/device_type.interface';
import { PagesService } from '../../pages.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})

export class DeviceDialogComponent implements OnInit, OnDestroy {

  deviceDialogForm!: FormGroup;
  disableClose: boolean = false;
  isEditing: boolean;
  isSelectDisabled: boolean = true;
  deviceTypes: DeviceType[] = [];
  userId: number;
  getDeviceTypes$: Subscription = new Subscription();
  editDevice$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private fb: FormBuilder,
    private pageService: PagesService,
    private toastr: ToastrService
  ) {
    this.userId = Number(localStorage.getItem('_userID'));
    this.isEditing = !!data;
    this.deviceDialogForm = fb.group({
      serial: [data ? data.serial : ''],
      mac: [data ? data.mac : ''],
      type_device: [data ? data.id_Tipo_Disp : null],
      activeChbx: [data ? data.sw_Activo : false],
    });
  }

  ngOnInit(): void {
    this.getDeviceTypes();
  }

  ngOnDestroy(): void {
    this.getDeviceTypes$.unsubscribe();
    this.editDevice$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.deviceDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {

      const dataDialog: Partial<Device> = {
        mac: this.deviceDialogForm.value.mac,
        serial: this.deviceDialogForm.value.serial,
        sw_Activo: Number(this.deviceDialogForm.value.activeChbx),
        usuario_Id: this.userId,
        id_Tipo_Disp: this.deviceDialogForm.value.type_device
      }
      this.pageService.saveDevice(dataDialog)
        .subscribe({
          next: (res: ResponseDevice) => {
            if(res.success) {
              this.toastr.success('Dispositivo añadido correctamente', 'Exito', {progressBar: true});
              this.dialogRef.close({isEditing: false});
            } else {
              this.toastr.error('No ha sido posible añadir el dispositivo', 'Error', {progressBar: true});
            }
          },
          error: () => {
            this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
          },
      })
    }

  }

  editDevice() {

    const dataDialog: Device = {
      mac: this.deviceDialogForm.value.mac,
      serial: this.deviceDialogForm.value.serial,
      sw_Activo: Number(this.deviceDialogForm.value.activeChbx),
      usuario_Id: this.userId,
      id_Tipo_Disp: this.deviceDialogForm.value.type_device,
      id_Disp: this.data.id_Disp
    };
    this.editDevice$ = this.pageService.editDevice(dataDialog)
    .subscribe({
      next: (res: ResponseDevice) => {
        if(res.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.dialogRef.close({editing: true});
        } else {
          this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  close() {
    this.dialogRef.close({editing: false});
  }

  getDeviceTypes() {
    this.getDeviceTypes$ = this.pageService.getDeviceTypes()
      .subscribe((res: DeviceTypeResponse) => {
        this.deviceTypes = res.tipoDispositivos;
      });
    }

}
