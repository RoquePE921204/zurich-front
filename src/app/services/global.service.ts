import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientResponse } from '../interfaces/client.interface';
import {
  CommonResponse,
  GlobalExceptionResponse,
} from '../interfaces/common.interface';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public loginApi: string = 'http://127.0.0.1:8080/user';
  public clientApi: string = 'http://127.0.0.1:8080/client';
  public insuranceApi: string = 'http://127.0.0.1:8080/insurance';
  public fields: { [key: string]: string } = {};

  public generalSuccessMessage: string =
    '¡Felicidades! Todo salio como lo planeamos';

  public genericHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  private loading = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private httpClient: HttpClient) {
    this.getFields().subscribe({
      next: (response) => {
        const keys = Object.keys(response);
        keys.forEach((key: string) => {
          this.fields[key] = response[key];
        });
      },
    });
  }

  getFields(): Observable<any> {
    return this.httpClient.get('assets/fields.json');
  }

  getToDoOrRedirect(): string | Function | null {
    const userRole = localStorage.getItem('role');
    let toDoOrRedirect: string | Function | null = '';
    if (userRole === 'ADMIN') {
      toDoOrRedirect = '/client-list';
    } else {
      toDoOrRedirect = this.logout;
    }
    return toDoOrRedirect;
  }

  setLoading(isLoading: boolean) {
    this.loading.next(isLoading);
  }

  getLoading() {
    return this.loading.asObservable();
  }

  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('clientId');
    localStorage.removeItem('originClientId');
    this.router.navigate(['/login']);
  }

  generalSuccessProccess(
    response: CommonResponse,
    toDoOrRedirect?: string | Function | null
  ): void {
    let alertTitle: string = '¡Alerta!';
    let alertIcon: SweetAlertIcon = 'warning';
    let alertMessage: string =
      'Oops lo sentimos, parece que algo no paso como lo esperabamos';
    if (response.result) {
      alertTitle = '¡Exito!';
      alertIcon = 'success';
      alertMessage = this.generalSuccessMessage;
    }
    this.showResult(alertTitle, alertMessage, alertIcon, toDoOrRedirect);
  }

  handleError(
    error: HttpErrorResponse,
    toDoOrRedirect?: string | Function | null
  ): void {
    this.setLoading(false);
    let alertIcon: SweetAlertIcon = 'error';
    let alertMessage: string = 'Oops lo sentimos, un error ha ocurrido';
    if (error.status === 400 || error.status === 406 || error.status === 500) {
      alertIcon = 'warning';
      const exceptionResponse = error.error as GlobalExceptionResponse;
      if (error.status === 400) {
        const html = Object.entries(exceptionResponse.messages)
          .map(
            ([key, value]) => `<li><b>${this.fields[key]}</b>: ${value}</li>`
          )
          .join('');
        alertMessage = `<ul style="list-style-type: none;">${html}</ul>`;
      } else {
        alertMessage = exceptionResponse.message;
      }
    }
    this.showResult('¡Alerta!', alertMessage, alertIcon, toDoOrRedirect);
  }

  showResult(
    alertTitle: string,
    alertMessage: string,
    alertIcon: SweetAlertIcon,
    toDoOrRedirect?: string | Function | null
  ): void {
    Swal.fire({
      title: alertTitle,
      html: alertMessage,
      icon: alertIcon,
      confirmButtonText: 'Cerrar',
    }).then(() => {
      if (typeof toDoOrRedirect === 'string') {
        this.router.navigate([toDoOrRedirect]);
      } else if (typeof toDoOrRedirect === 'function') {
        toDoOrRedirect();
      }
    });
  }
}
