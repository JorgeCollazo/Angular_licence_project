import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { License } from '../interface/license.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss']
})
export class LicenseDialogComponent {

  licenciaDialogForm!: FormGroup;
  disableClose: boolean = false;
  isEditing: boolean;
  isSelectDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<LicenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: License,
    private fb: FormBuilder,
    private security: SecurityService,
    private toastr: ToastrService
  ) {
    this.isEditing = !!data;
    this.licenciaDialogForm = fb.group({
      code: [data ? data.cod_Lic : ''],
      company: [''],
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
    if(this.licenciaDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {

      const dataDialog: Menu = {
        nombre: this.licenciaDialogForm.value.name,
        status: Number(this.licenciaDialogForm.value.activeChbx),
        sw_admin: Number(this.licenciaDialogForm.value.adminChbx),
        descripcion: this.licenciaDialogForm.value.description,
        nivel: this.licenciaDialogForm.value.nivel,
        link: this.licenciaDialogForm.value.link,
        sw_display: Number(this.licenciaDialogForm.value.showChbx),
        id_menu: -1,
        orden: this.licenciaDialogForm.value.orden,
        padre: this.licenciaDialogForm.value.parent
      }
      this.security.saveMenu(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Licencia añadida correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir la licencia correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }

  }

  editLicense() {

  }

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

  // setParentSelect(selection: boolean) {
  //   this.isSelectDisabled = !selection;
  // }

}
