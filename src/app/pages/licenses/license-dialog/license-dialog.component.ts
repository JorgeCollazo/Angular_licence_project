import { Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { License, ResponseLicense } from '../interface/license.interface';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from '../../pages.service';
import { LicenseType, ResponseLicenseType } from '../../license_types/interface/licenseType.interface';
import { ResponseStatus, Status } from '../../status/interface/status.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss']
})
export class LicenseDialogComponent implements OnInit, OnDestroy {

  licenciaDialogForm!: FormGroup;
  disableClose: boolean = false;
  isEditing: boolean;
  isSelectDisabled: boolean = true;
  userId: number;
  licenseTypes: LicenseType [] = [];
  status: Status [] = [];
  getLicenseTypes$: Subscription = new Subscription();
  getStatus$: Subscription = new Subscription();
  editLicense$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<LicenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: License,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.userId = Number(localStorage.getItem('_userID'));
    this.isEditing = !!data;
    this.licenciaDialogForm = fb.group({
      code: [data ? data.cod_Lic : ''],
      status: [data ? data.est_Id : null],
      license_type: [data ? data.tipo_Lic_Id : null],
    });
  }

  ngOnInit(): void {

    this.getLicenseTypes$ = this.pagesService.getLicenseType().subscribe((res: ResponseLicenseType) => {
      this.licenseTypes = res.tipoLicencias;
    });

    this.getStatus$ = this.pagesService.getStatus().subscribe((res: ResponseStatus) => {
      this.status = res.estados;
    });
  }

  ngOnDestroy(): void {
    this.getLicenseTypes$.unsubscribe();
    this.getStatus$.unsubscribe();
    this.editLicense$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.licenciaDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {

      const dataDialog: Partial<License> = {
        est_Id: Number(this.licenciaDialogForm.value.status),
        tipo_Lic_Id: Number(this.licenciaDialogForm.value.license_type),
        usuario_Id: this.userId,
        cod_Lic: this.licenciaDialogForm.value.code,
      }
      this.pagesService.saveLicense(dataDialog)
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

    const dataDialog: License = {
        est_Id: Number(this.licenciaDialogForm.value.status),
        tipo_Lic_Id: Number(this.licenciaDialogForm.value.license_type),
        usuario_Id: this.userId,
        cod_Lic: this.licenciaDialogForm.value.code,
        lic_Id: Number(this.data.lic_Id),
    };
    this.editLicense$ = this.pagesService.editLicense(dataDialog)
    .subscribe({
      next: (res: ResponseLicense) => {
        if(res.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.dialogRef.close({isRefreshing: true});
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
    this.dialogRef.close({isRefreshing: false});
  }

}
