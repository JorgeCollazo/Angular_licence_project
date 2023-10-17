import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { RoleListComponent } from './roles/role-list/role-list.component';

const routes: Routes = [
  { path: 'user-list', component:UserListComponent },
  { path: 'role-list', component:RoleListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SecurityRoutingModule { }
