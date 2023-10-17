import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleDialogComponent } from './roles/role-dialog/role-dialog.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserDialogComponent,
    RoleListComponent,
    RoleDialogComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    MaterialModule,
    SecurityRoutingModule,
  ]
})
export class SecurityModule { }


