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
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})

export class ProductDialogComponent {

  productDialogForm!: FormGroup;
  disableClose: boolean = false;
  
  isSelectDisabled: boolean = true;
  
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private security: SecurityService
  ) {

    this.productDialogForm = fb.group({
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
    if(this.productDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      console.log('this.menuDialogForm.value>>>>>>>>', this.productDialogForm.value);
      const dataDialog: Menu = {
        consulta: "",
        usu_accion: -1,
        nombre: this.productDialogForm.value.name,
        status: Number(this.productDialogForm.value.activeChbx),
        sw_admin: Number(this.productDialogForm.value.adminChbx),
        descripcion: this.productDialogForm.value.description,
        nivel: this.productDialogForm.value.nivel,
        link: this.productDialogForm.value.link,
        sw_display: Number(this.productDialogForm.value.showChbx),
        id_menu: -1,
        orden: this.productDialogForm.value.orden,
        padre: this.productDialogForm.value.parent
      }
      this.security.saveMenu(dataDialog)
    }

  }

  setParentSelect(selection: boolean) {
    this.isSelectDisabled = !selection;
  }
  
}
