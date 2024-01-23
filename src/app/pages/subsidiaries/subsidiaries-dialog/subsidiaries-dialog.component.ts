import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/security/menus/interfaces/menu.intereface';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { Subsidiary } from '../interface/subsidiary.interface';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { Entity, EntityDto, ResponseEntity } from '../../entities/interface/entity.interface';

@Component({
  selector: 'app-subsidiaries-dialog',
  templateUrl: './subsidiaries-dialog.component.html',
  styleUrls: ['./subsidiaries-dialog.component.scss']
})

export class SubsidiariesDialogComponent implements OnInit, OnDestroy {

  subsidiaryDialogForm!: FormGroup;
  disableClose: boolean = false;
  editSubsidiary$: Subscription = new Subscription();
  getEntities$: Subscription = new Subscription();
  isSelectDisabled: boolean = true;
  isEditing: boolean;
  entities: EntityDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<SubsidiariesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subsidiary,
    private fb: FormBuilder,
    private security: SecurityService,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.isEditing = !!data;
    this.subsidiaryDialogForm = fb.group({
      entidad_Id: [data ? data.entidad_Id : null],
      grp_Ent_Id: [data ? data.subGrp_Id : null],
      subGrp_Nombre: [data ? data.subGrp_Nombre : '']
    });
  }

  ngOnInit(): void {
    this.getEntities$ = this.pagesService.getEntities().subscribe((response: ResponseEntity) => {
      this.entities = response.entidades;
    });
  }

  ngOnDestroy(): void {

  }

  onSaveClick(): void {
    if(this.subsidiaryDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {

      const dataDialog: Partial<Subsidiary> = {
        subGrp_Nombre: this.subsidiaryDialogForm.value.subGrp_Nombre,
        entidad_Id: this.subsidiaryDialogForm.value.entidad_Id,
      }
      this.pagesService.saveSubsidiary(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Sucursal añadida correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir la sucursal correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }
  }

  editSubsidiary() {

    const dataDialog: Subsidiary = {
      subGrp_Id: this.data.subGrp_Id,
      entidad_Id : this.subsidiaryDialogForm.value.entidad_Id,
      subGrp_Nombre: this.subsidiaryDialogForm.value.subGrp_Nombre,
    };
    this.editSubsidiary$ = this.pagesService.editSubsidiary(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.close();
        } else {
          this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
        }
      },
      error: () => {

      },
    })
  }

  // setParentSelect(selection: boolean) {
  //   this.isSelectDisabled = !selection;
  // }

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

}
