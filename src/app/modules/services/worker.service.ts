import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../env/enviroment';
import { WorkerResponse, WorkerScheduleResponse } from '../models/worker-response.interface';

const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class WorkerService {
  private http = inject(HttpClient);

  getWorkersByCompanyCode(companyCode: string): Observable<WorkerResponse[]> {
    return this.http.get<WorkerResponse[]>(`${baseUrl}/workers/company/${companyCode}`);
  }

  getSchedulesByWorkerId(id: string): Observable<WorkerScheduleResponse> {
    return this.http.get<WorkerScheduleResponse>(`${baseUrl}/worker/${id}/schedules`);
  }

  deleteWorkersByCompanyCode(companyCode: string): Observable<any> {
    return this.http.delete(`${baseUrl}/workers/company/${companyCode}`);
  }
}
