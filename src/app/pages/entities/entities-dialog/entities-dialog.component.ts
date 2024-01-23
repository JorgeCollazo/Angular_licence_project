import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { Company, ResponseCompany } from '../../companies/interface/company.interface';
import { PagesService } from '../../pages.service';
import { Subscription } from 'rxjs';
import { Entity, EntityDto } from '../interface/entity.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entities-dialog',
  templateUrl: './entities-dialog.component.html',
  styleUrls: ['./entities-dialog.component.scss']
})

export class EntitiesDialogComponent implements OnInit, OnDestroy {

  EntityDialogForm!: FormGroup;
  disableClose: boolean = false;
  isSelectDisabled: boolean = true;
  companies: Company[] = [];
  isEditing: boolean;
  getCompanies$: Subscription = new Subscription();
  editEntity$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<EntitiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityDto,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {

    this.isEditing = !!data;
    this.EntityDialogForm = fb.group({
      name: [data ? data.enT_Nombre : null, Validators.required],
      company_id: [data ? data.grP_ID : null, Validators.required],
      isActive: [data ? data.sw_Activo : false],
    });
  }

  ngOnInit(): void {
    this.getCompanies$ = this.pagesService.getCompanies().subscribe((companies: ResponseCompany) => {
        this.companies = companies.grupoEntidades;
    });
  }

  ngOnDestroy(): void {
    this.getCompanies$.unsubscribe();
    this.editEntity$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.EntityDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<Entity> = {
        mant_nombre: this.EntityDialogForm.value.name,
        mant_grp_id: this.EntityDialogForm.value.company_id,
        mant_activo: +this.EntityDialogForm.value.isActive,
      }
      this.pagesService.saveEntity(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Entidad añadida correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir la entidad correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }

  }

  editEntity() {

    const dataDialog: Entity = {
      mant_ent_id: this.data.enT_ID,
      mant_grp_id: this.data.grP_ID,
      mant_activo: Number(this.EntityDialogForm.value.isActive),
      mant_nombre: this.EntityDialogForm.value.name,
    };
    this.editEntity$ = this.pagesService.editEntity(dataDialog)
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

  // setParentSelect(selection: boolean) {
  //   this.isSelectDisabled = !selection;
  // }
}









