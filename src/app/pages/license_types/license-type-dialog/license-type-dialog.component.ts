import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { LicenseType } from '../interface/licenseType.interface';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-license-type-dialog',
  templateUrl: './license-type-dialog.component.html',
  styleUrls: ['./license-type-dialog.component.scss']
})

export class LicenseTypeDialogComponent implements OnDestroy {

  licenseTypeDialogForm!: FormGroup;
  disableClose: boolean = false;
  user_id: number;
  isSelectDisabled: boolean = true;
  isEditing: boolean;
  editLicenseType$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<LicenseTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LicenseType,
    private fb: FormBuilder,
    private pageService: PagesService,
    private toastr: ToastrService
  ) {
    this.isEditing = !!data;
    this.user_id = Number(localStorage.getItem('_userID'));
    this.licenseTypeDialogForm = fb.group({
      name: [data ? data.nombre : ''],
      description: [data ? data.descripcion : ''],
      activeChbx: [data ? data.sw_Activo : false],
      showChbx: [data ? data.sw_Mostrar : false],
      adminChbx: [data ? data.sw_Admin : false],
    });
  }

  ngOnDestroy(): void {
    this.editLicenseType$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.licenseTypeDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<LicenseType> = {
        nombre: this.licenseTypeDialogForm.value.name,
        descripcion: this.licenseTypeDialogForm.value.description,
        sw_Admin: Number(this.licenseTypeDialogForm.value.adminChbx),
        sw_Activo: Number(this.licenseTypeDialogForm.value.adminChbx),
        sw_Mostrar: Number(this.licenseTypeDialogForm.value.showChbx),
        usuario_Id: this.user_id
      }

      this.pageService.saveLicenseType(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Tipo de licencia añadida correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir tipo de licencia correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }

  }

  editLicenseType() {

    const dataDialog: LicenseType = {
      nombre: this.licenseTypeDialogForm.value.name,
      descripcion: this.licenseTypeDialogForm.value.description,
      sw_Activo: Number(this.licenseTypeDialogForm.value.activeChbx),
      sw_Admin: Number(this.licenseTypeDialogForm.value.adminChbx),
      sw_Mostrar: Number(this.licenseTypeDialogForm.value.showChbx),
      usuario_Id: this.user_id,
      tipo_Lic_Id: this.data.tipo_Lic_Id,
    };
    this.editLicenseType$ = this.pageService.editLicenseType(dataDialog)
    .subscribe({
      next: (response) => {
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
