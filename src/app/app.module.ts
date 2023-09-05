import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NavigationComponent } from '../app/layout/navigation/navigation.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SublevelMenuComponent } from './layout/sidenav/sublevel-menu.component';
import { SidenavMenuComponent } from './layout/sidenav-menu/sidenav-menu.component';
import { SecurityModule } from './security/security.module';
import { HeaderPageComponent } from './layout/header-page/header-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    SidenavComponent,
    SublevelMenuComponent,
    SidenavMenuComponent,
    HeaderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    SecurityModule
  ],
  exports: [
    // HeaderPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
