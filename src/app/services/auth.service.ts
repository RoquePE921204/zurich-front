import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    this.globalService.setLoading(true);
    return this.httpClient.post<any>(
      `${this.globalService.loginApi}/login`,
      request,
      {
        headers: this.globalService.genericHeaders,
        withCredentials: false,
      }
    );
  }
}
