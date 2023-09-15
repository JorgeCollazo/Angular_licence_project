import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { MaterialModule } from '../material/material.module';

import { HeaderPageComponent } from '../layout/header-page/header-page.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    // UserListComponent,
    UserDialogComponent,
    // HeaderPageComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    MaterialModule
  ],
  exports: [
    // UserListComponent,
    MaterialModule
  ]
})
export class SecurityModule { }


