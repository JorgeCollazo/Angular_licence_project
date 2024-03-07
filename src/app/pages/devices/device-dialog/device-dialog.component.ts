import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { DeviceData } from '../interface/device.interface';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})

export class DeviceDialogComponent {

  deviceDialogForm!: FormGroup;
  disableClose: boolean = false;
  isEditing: boolean;
  isSelectDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private security: SecurityService
  ) {
    this.isEditing = !!data;
    this.deviceDialogForm = fb.group({
      serial: [''],
      mac: [''],
      type_device: [],
      nivel: [null],
      parent: [{ value: null, disabled: true }],
      description: [null],
      activeChbx:false,
      isSubmenuChbx:false,
      showChbx:true,
      adminChbx:false
    });
  }

  onSaveClick(): void {
    if(this.deviceDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      console.log('this.deviceDialogForm.value>>>>>>>>', this.deviceDialogForm.value);
      const dataDialog: Menu = {
        nombre: this.deviceDialogForm.value.name,
        status: Number(this.deviceDialogForm.value.activeChbx),
        sw_admin: Number(this.deviceDialogForm.value.adminChbx),
        descripcion: this.deviceDialogForm.value.description,
        nivel: this.deviceDialogForm.value.nivel,
        link: this.deviceDialogForm.value.link,
        sw_display: Number(this.deviceDialogForm.value.showChbx),
        id_menu: -1,
        orden: this.deviceDialogForm.value.orden,
        padre: this.deviceDialogForm.value.parent
      }
      this.security.saveMenu(dataDialog)
    }

  }

  editDevice() {

    // const dataDialog: DeviceData = {
    //   nombre: this.deviceDialogForm.value.name,
    //   producto_Id: this.data.producto_Id,
    //   sw_Activo: Number(this.deviceDialogForm.value.activeChbx),
    //   descripcion: this.deviceDialogForm.value.description,
    //   usuario_Id: this.userID,
    //   tipo_Lic_Id: this.deviceDialogForm.value.license_type,
    // };
    // this.editProduct$ = this.pagesService.editProduct(dataDialog)
    // .subscribe({
    //   next: (response) => {
    //     if(response.success) {
    //       this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
    //       this.dialogRef.close({editing: true});
    //     } else {
    //       this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
    //     }
    //   },
    //   error: () => {

    //   },
    // })
  }

  close() {
    this.dialogRef.close({editing: false});
  }

  // setParentSelect(selection: boolean) {
  //   this.isSelectDisabled = !selection;
  // }

}
