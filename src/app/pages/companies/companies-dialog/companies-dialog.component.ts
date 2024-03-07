import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CompanyTypeData, CompanyTypeResponse } from '../../company_types/interface/company_type.interface';
import { PagesService } from '../../pages.service';
import { Company } from '../interface/company.interface';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies-dialog',
  templateUrl: './companies-dialog.component.html',
  styleUrls: ['./companies-dialog.component.scss']
})

export class CompaniesDialogComponent implements OnInit, OnDestroy {

  companyDialogForm: FormGroup;
  disableClose: boolean = false;
  companyTypes: CompanyTypeResponse[] = [];
  isSelectDisabled: boolean = true;
  userID: number;
  editCompany$: Subscription = new Subscription();
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<CompaniesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.userID = Number(localStorage.getItem('_userID'));
    this.isEditing = !!data;
    this.companyDialogForm = fb.group({
      nombre: [data ? data.grp_Nombre : ''],
      activeChbx: [data ? data.sw_Activo : false]
    });
  }

  ngOnInit(): void {
    this.pagesService.getCompanyTypes().subscribe((res) => {
      this.companyTypes = res.tiposEntidades;
    })
  }

  ngOnDestroy(): void {
    this.editCompany$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.companyDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<Company> = {
        grp_Nombre: this.companyDialogForm.value.nombre,
        sw_Activo: Number(this.companyDialogForm.value.activeChbx),
      }
      this.pagesService.saveCompany(dataDialog)
        .subscribe({
          next: (response) => {
            if(response.success) {
              this.toastr.success('Compañía añadida correctamente', 'Exito', {progressBar: true});
              this.dialogRef.close({isRefreshing: true});
            } else {
              this.toastr.error('No ha sido posible añadir la compañía correctamente', 'Error', {progressBar: true});
            }
          },
          error: () => {
            this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
          },
        })
    }
  }

  editCompany() {

    const dataDialog: Company = {
      grp_Ent_Id: this.data.grp_Ent_Id,
      sw_Activo: Number(this.companyDialogForm.value.activeChbx),
      grp_Nombre: this.companyDialogForm.value.nombre,
    };
    this.editCompany$ = this.pagesService.editCompany(dataDialog)
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
