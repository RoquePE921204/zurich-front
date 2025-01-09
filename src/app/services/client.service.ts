import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { ClientRequest, ClientResponse } from '../interfaces/client.interface';
import { CommonResponse } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) {}

  getClientList(): Observable<ClientResponse[]> {
    this.globalService.setLoading(true);
    return this.httpClient.get<any>(`${this.globalService.clientApi}/list`, {
      headers: this.globalService.genericHeaders,
      withCredentials: false,
    });
  }

  getClient(clientId: string): Observable<ClientResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.get<any>(
      `${this.globalService.clientApi}/${clientId}`,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }

  createClient(request: ClientRequest): Observable<CommonResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.post<any>(
      `${this.globalService.clientApi}`,
      request,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }

  updateClient(request: ClientRequest): Observable<CommonResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.put<any>(
      `${this.globalService.clientApi}`,
      request,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }

  deletetClient(clientId: string): Observable<CommonResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.delete<any>(
      `${this.globalService.clientApi}/${clientId}`,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }
}
