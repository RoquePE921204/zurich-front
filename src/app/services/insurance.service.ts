import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import {
  InsuranceRequest,
  InsuranceResponse,
} from '../interfaces/insurance.interface';
import { CommonResponse } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) {}

  getInsuranceList(clientId: string): Observable<InsuranceResponse[]> {
    this.globalService.setLoading(true);
    return this.httpClient.get<any>(
      `${this.globalService.insuranceApi}/list/${clientId}`,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }

  getInsurance(insuranceId: string): Observable<InsuranceResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.get<any>(
      `${this.globalService.insuranceApi}/${insuranceId}`,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }

  createInsurance(request: InsuranceRequest): Observable<CommonResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.post<any>(
      `${this.globalService.insuranceApi}`,
      request,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }

  updateInsurance(request: InsuranceRequest): Observable<CommonResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.put<any>(
      `${this.globalService.insuranceApi}`,
      request,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }

  deletetInsurance(insuranceId: string): Observable<CommonResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.delete<any>(
      `${this.globalService.insuranceApi}/${insuranceId}`,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }
}
