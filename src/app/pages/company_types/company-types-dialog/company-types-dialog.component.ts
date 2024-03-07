import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyTypeData, CompanyTypeResponse } from '../interface/company_type.interface';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-types-dialog',
  templateUrl: './company-types-dialog.component.html',
  styleUrls: ['./company-types-dialog.component.scss']
})

export class CompanyTypesDialogComponent implements OnDestroy{

  companyTypeDialogForm!: FormGroup;
  companyTypes: CompanyTypeData[] = [];
  isEditing: boolean;
  editCompanyType$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<CompanyTypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyTypeResponse,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {

    this.isEditing = !!data;
    this.companyTypeDialogForm = fb.group({
      name: [data ? data.tpE_Nombre : ''],
      activeChbx: [data ? data.sw_Activo : false]
    });
  }

  ngOnInit(): void {
    this.pagesService.getCompanyTypes().subscribe((res) => {
      this.companyTypes = res.tiposEntidades;
    })
  }

  ngOnDestroy(): void {
    this.editCompanyType$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.companyTypeDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<CompanyTypeData> = {
        mant_nombre: this.companyTypeDialogForm.value.name,
        mant_activo: Number(this.companyTypeDialogForm.value.activeChbx),
      }
      this.pagesService.saveCompanyType(dataDialog)
        .subscribe({
          next: (response) => {
            if(response.success) {
              this.toastr.success('Tipo de compañía añadido correctamente', 'Exito', {progressBar: true});
              this.close();
            } else {
              this.toastr.error('No ha sido posible añadir el tipo de compañía correctamente', 'Error', {progressBar: true});
            }
          },
          error: () => {
            this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
          },
        })
    }
  }

  editCompanyType() {

    const dataDialog: CompanyTypeData = {
      mant_cod: this.data.tpE_COD,
      mant_activo: Number(this.companyTypeDialogForm.value.activeChbx),
      mant_nombre: this.companyTypeDialogForm.value.name,
    };
    this.editCompanyType$ = this.pagesService.editCompanyType(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.close();
        } else {
          this.toastr.error('No ha sido posible editar correctamente', 'Error', {progressBar: true});
        }
      },
      error: () => {

      },
    })
  }

  close() {
    this.dialogRef.close();
  }
}
