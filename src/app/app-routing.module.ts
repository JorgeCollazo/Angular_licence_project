import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from '../app/layout/navigation/navigation.component';
import { authGuard } from './auth/auth.guard';
import { UserListComponent } from './security/users/user-list/user-list.component';

const routes: Routes = [
  { path: 'navigation', component: NavigationComponent, canActivate: [authGuard] ,
    children: [
      { path: 'user-list', component: UserListComponent}
    //   { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
  { path: 'user-list', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
