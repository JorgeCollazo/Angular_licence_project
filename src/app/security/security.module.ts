import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './users/user-list/user-list.component';
import { SecurityRoutingModule } from './security-routing.module';
import { MaterialModule } from '../material/material.module';
import { HeaderPageComponent } from '../layout/header-page/header-page.component';

@NgModule({
  declarations: [
    UserListComponent,
    // HeaderPageComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    MaterialModule
  ],
  exports: [
    UserListComponent,
  ]
})
export class SecurityModule { }
