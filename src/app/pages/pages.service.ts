import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { Company, ResponseCompany } from './companies/interface/company.interface';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';
import { Product, ResponseProducto } from './products/interface/productoData.interface';
import { DeviceData } from './devices/interface/device.interface';
import { License } from './licenses/interface/license.interface';
import { Entity, EntityDto, ResponseEntity } from './entities/interface/entity.interface';
import { CompanyTypeData } from './company_types/interface/company_type.interface';
import { LicenseTypeData } from './license_types/interface/licenseType.interface';
import { Subsidiary } from './subsidiaries/interface/subsidiary.interface';
import { Service } from './services/interface/serviceData.interface';
import { PriceData } from './precio/interface/precioData.interface';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient, private securityService: SecurityService ) { }


/***************** Companies *****************/

getCompanies(): Observable<ResponseCompany>{

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<ResponseCompany>(`${environment.apiURL}/GrupoEntidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de compañías';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  saveCompany(company: Partial<Company>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/GrupoEntidad`, company, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar la compañía';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteCompany(grp_Ent_Id: number): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/GrupoEntidad/${grp_Ent_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar la compañía seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
  }

  editCompany(company: Company): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/GrupoEntidad/${company.grp_Ent_Id}`, company, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar la compañía';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }


  /*********************** Company Types ********************/

  getCompanyTypes(): Observable<any>{

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<{company: CompanyTypeData[]}>(`${environment.apiURL}/TipoEntidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de tipos de compañias';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  saveCompanyType(company: Partial<CompanyTypeData>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/TipoEntidad`, company, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar el tipo de entidad';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  editCompanyType(companyType: CompanyTypeData): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/TipoEntidad/${companyType.mant_cod}`, companyType, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el tipo de compañía';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  /***************** Entities *****************/

  getEntities(): Observable<ResponseEntity> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<ResponseEntity>(`${environment.apiURL}/Entidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de entidades';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteEntity(grp_Ent_Id: number): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Entidad/${grp_Ent_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar la entidad seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
  }

  saveEntity(entity: Partial<Entity>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/Entidad`, entity, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar la entidad';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  editEntity(entity: Entity): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    console.log('entity>>>>>>>>>>>', entity);

    return this.http.put(`${environment.apiURL}/Entidad/${entity.mant_ent_id}`, entity, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar la entidad';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  /***************** Subsidiaries *****************/

  getSubsidiaries(): Observable<any>{

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<{menu: Entity[]}>(`${environment.apiURL}/SubGrpEntidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de sucursales';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteSubsidiary(grp_Ent_Id: number) {

    const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/SubGrpEntidad/${grp_Ent_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar la sucursal seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
  }

  editSubsidiary(subsidiary: Subsidiary): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/SubGrpEntidad/${subsidiary.subGrp_Id}`, subsidiary, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar la sucursal';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  saveSubsidiary(subsidiary: Partial<Subsidiary>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/SubGrpEntidad`, subsidiary, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar la sucursal';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

/***************** Products *****************/

getProductos(): Observable<ResponseProducto>{

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponseProducto>(`${environment.apiURL}/Producto`, {headers: headers})
    .pipe(
      catchError(err => {
        // const message = 'Error al cargar la lista de productos';

        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: message
        // })

        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

saveProduct(product: Partial<Product>): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post(`${environment.apiURL}/Producto`, product, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al salvar el Producto';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deleteProduct(producto_Id: number) {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Producto/${producto_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el producto seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}

editProduct(product: Product): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/Producto/${product.producto_Id}`, product, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el producto';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
}

/***************** Devices *****************/

getDevices(): Observable<any>{

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{device: DeviceData[]}>(`${environment.apiURL}/Dispositivo`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de dispositivos';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deleteDevice(device_id: number) {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Dispositivo/${device_id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el dispositivo seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}


/***************** Licenses *****************/

getLicenses(): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{licenses: License[]}>(`${environment.apiURL}/Licencia`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de licencias';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deleteLicense(lic_Id: number) {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Licencia/${lic_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar la licencia seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}


/***************** License Types *****************/

getLicenseType(): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{licenses: LicenseTypeData[]}>(`${environment.apiURL}/TipoLicencia`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de tipos de licencias';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

saveLicenseType(licenseType: Partial<LicenseTypeData>): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post(`${environment.apiURL}/TipoLicencia`, licenseType, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al salvar el tipo de licencia';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deleteLicenseType(tipo_Lic_Id: number) {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/TipoLicencia/${tipo_Lic_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el tipo de licencia seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}

editLicenseType(licenseType: LicenseTypeData): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/TipoLicencia/${licenseType.tipo_Lic_Id}`, licenseType, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el tipo de Licencia';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
}

/***************** Services *****************/

getServices(): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{services: Service[]}>(`${environment.apiURL}/Servicio`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de servicios';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

getServicesByProduct(id_product: number): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{services: Service[]}>(`${environment.apiURL}/Servicio`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de servicios';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deleteService(service_Id: number) {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Servicio/${service_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el servicio seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}

/***************** Prices *****************/

getPrices(): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{services: Service[]}>(`${environment.apiURL}/Precio`, {headers: headers})
    .pipe(
      catchError(err => {

        const message = 'Error al cargar la lista de precios';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deletePrice(price_id: number): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Precio/${price_id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el precio seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}

editPrice(price: PriceData): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/Precio/${price.id_Precio}`, price, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el precio';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
}

/***************** Payments *****************/
/***************** CxC *****************/

}
