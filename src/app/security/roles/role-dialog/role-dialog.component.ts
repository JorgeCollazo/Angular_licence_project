import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Role } from '../interfaces/role.interface';
import { SecurityService } from '../../security.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss'],
})
export class RoleDialogComponent implements OnInit, OnDestroy{

  roleDialogForm!: FormGroup;
  isEditing: boolean = false;
  saveRol$: Subscription = new Subscription();
  editRol$: Subscription = new Subscription();
  
  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private fb: FormBuilder,
    private securityService: SecurityService,
    private toastr: ToastrService
  ) {
    this.isEditing = !!data;
    this.roleDialogForm = fb.group({
      name: [data ? data.nombre : ''],
      descripcion: [data ? data.descripcion : ''],
      nivel: [data ? data.nivel : null],
      activeChbx: [data ? data.status : false],
      adminChbx: [data ? data.sw_admin : false],
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.editRol$.unsubscribe();
    this.saveRol$.unsubscribe();
  }

  saveRol(): void {
    if (this.roleDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario',
      });
    } else {
      const dataDialog: Role = {
        rol_id: -1,
        nombre: this.roleDialogForm.value.name,
        descripcion: this.roleDialogForm.value.descripcion,
        status: Number(this.roleDialogForm.value.activeChbx),
        sw_admin: Number(this.roleDialogForm.value.adminChbx),
        nivel: parseInt(this.roleDialogForm.value.nivel),
      };
      
      this.saveRol$ = this.securityService.saveRol(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Rol añadido correctamente', 'Exito', {progressBar: true});
            this.close();  
          } else {
            this.toastr.error('No ha sido posible añadir el rol correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          
        },
      })
    }
  }

  editRol() {

    const dataDialog: Role = {
      nombre: this.roleDialogForm.value.name,
      status: Number(this.roleDialogForm.value.activeChbx),
      sw_admin: Number(this.roleDialogForm.value.adminChbx),
      descripcion: this.roleDialogForm.value.descripcion,
      nivel: parseInt(this.roleDialogForm.value.nivel),
      rol_id: this.data.rol_id,
    };
    this.editRol$ = this.securityService.editRol(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
          this.toastr.success('Rol editado correctamente', 'Exito', {progressBar: true});
          this.close();  
        } else {
          this.toastr.error('No ha sido posible editar el rol correctamente', 'Error', {progressBar: true});
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
