import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap, map, catchError, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../../env/enviroment';
import { WorkerResponse } from '../models/worker-response.interface';
import { CompanyResponse } from '../models/company-response.interface';
import { Router } from '@angular/router';

//Creamos la constante base url para
const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _role = signal(2);
  private _companyCode = signal('');
  private _company = signal<CompanyResponse | null>(null);

  private companySubject: BehaviorSubject<CompanyResponse | null> = new BehaviorSubject<CompanyResponse | null>(null);
  public company$: Observable<CompanyResponse | null> = this.companySubject.asObservable();

  role = computed(() => {
    if(this._role() == 2) return 2;
    if(this._company()) return 1;
    return 2;
  });

  companyCode = computed(() => this._companyCode());

  // Método para obtener la empresa actualmente logueada
  get company(): CompanyResponse | null {
    return this.companySubject.value;
  }

  // Metodo para loguearse
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<CompanyResponse>(`${baseUrl}/company/login`, { email, password }).pipe(
      tap((companyData) => {
        this.companySubject.next(companyData); // Actualiza el estado de la empresa
        this._company.set(companyData);        // Almacena empresa
        this._companyCode.set(companyData.companyCode); // ✅ Esto es lo que faltaba
      }),
      map(() => true),
      catchError((error: any) => {
        this.companySubject.next(null); // Si ocurre un error, resetear el estado de la empresa
        return of(false);
      })
    );
  }

  // Método para obtener la empresa por su companyCode
  getCompanyByCode(companyCode: string): Observable<CompanyResponse | null > {
    return this.http.get<CompanyResponse>(`${baseUrl}/company/code/${companyCode}`).pipe(
      tap((company) => {
        this._company.set(company);  // Almacena los detalles de la empresa
        this._companyCode.set(company.companyCode);  // Almacena el companyCode en el signal
      }),
      catchError((error: any) => {
        console.error('Error getting company by code', error);
        return of(null);  // Retorna null en caso de error
      })
    );
  }

  getAllCompanies(): Observable<CompanyResponse[]> {
    return this.http.get<CompanyResponse[]>(`${baseUrl}/companies`);
  }

  // Metodo para cerrar sesión
  logOut() {
    this.companySubject.next(null); // Limpia los datos de la empresa al cerrar sesión
    this.router.navigateByUrl('login');
  }
}
