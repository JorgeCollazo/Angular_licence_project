import { Component, Inject, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../roles/interfaces/role.interface';
import { SecurityService } from '../../security.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})

export class UserDialogComponent implements OnInit, OnDestroy {

  userDialogForm: FormGroup;
  roles: Role[] = [];
  private roles$: Subscription = new Subscription();
  private saveUser$: Subscription = new Subscription();
  private editUser$: Subscription = new Subscription();
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private securityService: SecurityService,
    private toastr: ToastrService
  ) {
    console.log('data>>>>>>>>>>', data);
    this.isEditing = !!data;
    this.userDialogForm = fb.group({
      email: [data ? data.email : null, !this.isEditing ? [Validators.required, Validators.email] : null],
      password: [data ? data.contrasena : null, !this.isEditing ? [Validators.required] : null],
      rol_id: [data ? data.rol_id : null, [Validators.required]],
      cedula: [data ? data.cedula : null],
      activeChbx: [data ? data.status : false],
      adminChbx: [data ? data.sw_admin : true],
    });
    console.log('data>>>>>>>>>>', this.userDialogForm);
  }

  ngOnInit(): void {
   this.roles$ =  this.securityService.getRoles()
      .subscribe(roles => {
        this.roles = roles.roles;
      })
  }

  ngOnDestroy(): void {
    this.roles$.unsubscribe();
    this.saveUser$.unsubscribe();
    this.editUser$.unsubscribe();
  }

  saveUser(): void {
    if (this.userDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario',
      });
    } else {

      const dataDialog: Partial<User> = {
        email: this.userDialogForm.value.email,
        contrasena: this.userDialogForm.value.password,
        status: Number(this.userDialogForm.value.activeChbx),
        sw_admin: Number(this.userDialogForm.value.adminChbx),
        rol_id: this.userDialogForm.value.rol_id,
        cedula: this.userDialogForm.value.cedula,
      };

      this.saveUser$ = this.securityService.saveUser(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Usuario añadido correctamente', 'Exito', {progressBar: true});
            this.close();
          } else {
            this.toastr.error(response.message, 'Error', {progressBar: true});
          }
                  },
        error: () => {

        },
      })
    }
  }

  editUser() {

    const dataDialog: Partial<User> = {
      usuario_id: this.data.usuario_id,
      email: this.userDialogForm.value.email,
      status: Number(this.userDialogForm.value.activeChbx),
      sw_admin: Number(this.userDialogForm.value.adminChbx),
      rol_id: parseInt(this.userDialogForm.value.rol_id),
      cedula: this.userDialogForm.value.cedula,
      contrasena: this.userDialogForm.value.contrasena,
    };
    this.editUser$ = this.securityService.editUser(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
          this.toastr.success('Menú editado correctamente', 'Exito', {progressBar: true});
          this.close();
        } else {
          this.toastr.error('No ha sido posible editar el menú correctamente', 'Error', {progressBar: true});
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
