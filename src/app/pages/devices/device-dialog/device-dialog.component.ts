import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';

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

  menuDialogForm!: FormGroup;
  disableClose: boolean = false;
  
  isSelectDisabled: boolean = true;
  
  constructor(
    public dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private security: SecurityService
  ) {

    this.menuDialogForm = fb.group({
      name: [null],
      link: [null],
      orden: [null],
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
    if(this.menuDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      console.log('this.menuDialogForm.value>>>>>>>>', this.menuDialogForm.value);
      const dataDialog: Menu = {
        consulta: "",
        usu_accion: -1,
        nombre: this.menuDialogForm.value.name,
        status: Number(this.menuDialogForm.value.activeChbx),
        sw_admin: Number(this.menuDialogForm.value.adminChbx),
        descripcion: this.menuDialogForm.value.description,
        nivel: this.menuDialogForm.value.nivel,
        link: this.menuDialogForm.value.link,
        sw_display: Number(this.menuDialogForm.value.showChbx),
        id_menu: -1,
        orden: this.menuDialogForm.value.orden,
        padre: this.menuDialogForm.value.parent
      }
      this.security.saveMenu(dataDialog)
    }

  }

  setParentSelect(selection: boolean) {
    this.isSelectDisabled = !selection;
  }
  
}
