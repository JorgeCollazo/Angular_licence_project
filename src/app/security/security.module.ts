import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleDialogComponent } from './roles/role-dialog/role-dialog.component';
import { SharedModule } from '../shared/shared/shared.module';
// import {MatChipsModule} from '@angular/material/chips';
import { MenuDialogComponent } from './menus/menu-dialog/menu-dialog.component';
import { MenuListComponent } from './menus/menu-list/menu-list.component';
import { RolesMenuComponent } from './roles-menu/roles-menu.component';
@NgModule({
  declarations: [
    UserListComponent,
    UserDialogComponent,
    RoleListComponent,
    RoleDialogComponent,
    MenuListComponent,
    MenuDialogComponent,
    RolesMenuComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    // MaterialModule,
    SecurityRoutingModule,
  ]
})
export class SecurityModule { }


