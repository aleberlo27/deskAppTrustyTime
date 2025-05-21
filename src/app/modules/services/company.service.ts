import { inject, Injectable } from '@angular/core';
import { environment } from '../../../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class CompanyService {
  http = inject(HttpClient);

  // Función para agregar la compañía
  addCompany(companyData: Company): Observable<Company> {
    return this.http.post<Company>(`${baseUrl}/company`, companyData);
  }

}
