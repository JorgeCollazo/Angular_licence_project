import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesListComponent } from './companies/companies-list/companies-list.component';
import { EntitiesListComponent } from './entities/entities-list/entities-list.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { LicenseTypeListComponent } from './license_types/license-type-list/license-type-list.component';
import { LicenseListComponent } from './licenses/license-list/license-list.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { CxcListComponent } from './cxc/cxc-list/cxc-list.component';
import { SubsidiariesListComponent } from './subsidiaries/subsidiaries-list/subsidiaries-list.component';
import { CompanyTypesListComponent } from './company_types/company-types-list/company-types-list.component';
import { ServicesListComponent } from './services/services-list/services-list.component';
import { PrecioListComponent } from './precio/precio-list/precio-list.component';
import { ProductServicesListComponent } from './products/product-services-list/product-services-list.component';
import { DeviceTypeListComponent } from './device_types/device-type-list/device-type-list.component';
import { StatusTypesListComponent } from './status_types/status-types-list/status-types-list.component';
import { StatusListComponent } from './status/status-list/status-list.component';

const routes: Routes = [
  { path: 'companies-list', component: CompaniesListComponent },
  { path: 'company-type-list', component: CompanyTypesListComponent },
  { path: 'entities-list', component: EntitiesListComponent },
  { path: 'subsidiaries-list', component: SubsidiariesListComponent },
  { path: 'products-list', component: ProductListComponent },
  { path: 'product-service-list', component: ProductServicesListComponent },
  { path: 'devices-list', component: DeviceListComponent },
  { path: 'devices-type-list', component: DeviceTypeListComponent },
  { path: 'license-type-list', component: LicenseTypeListComponent },
  { path: 'license-list', component: LicenseListComponent },
  { path: 'payment-list', component: PaymentListComponent },
  { path: 'cxc-list', component: CxcListComponent },
  { path: 'services-list', component: ServicesListComponent },
  { path: 'precio-list', component: PrecioListComponent },
  { path: 'status-types-list', component: StatusTypesListComponent },
  { path: 'status-list', component: StatusListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
