import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  { path: 'user-list', component:UserListComponent },
  { path: 'role-list', component:RoleListComponent },
  { path: 'menu-list', component:MenuListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SecurityRoutingModule { }
