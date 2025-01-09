import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import {
  ClientRequest,
  ClientResponse,
} from '../../interfaces/client.interface';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonResponse } from '../../interfaces/common.interface';

@Component({
  selector: 'app-client-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
})
export class ClientProfileComponent implements OnInit {
  public isNew: boolean = true;
  public userRole: string = '';

  public id: string = '';
  public userId?: number;
  public fullName: string = '';
  public email: string = '';
  public telephone: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    localStorage.removeItem('originClientId');
    this.userRole = localStorage.getItem('role')
      ? localStorage.getItem('role')!.toString()
      : '';
    this.getClient();
  }

  getClient(): void {
    let toDoOrRedirect: string | Function | null =
      this.globalService.getToDoOrRedirect();
    this.route.paramMap.subscribe((params) => {
      let clientId: string = '';
      const clientIdSesion = localStorage.getItem('clientId');
      if (clientIdSesion) {
        clientId = clientIdSesion;
      } else {
        clientId = params.get('id') ? params.get('id')!.toString() : '0';
      }
      if (clientId != '0') {
        this.clientService.getClient(clientId).subscribe({
          next: (response: ClientResponse) => {
            this.isNew = false;
            this.id = response.id;
            this.userId = response.userId;
            this.fullName = response.fullName;
            this.email = response.email;
            this.telephone = response.telephone;
            this.globalService.setLoading(false);
          },
          error: (err) => this.globalService.handleError(err, toDoOrRedirect),
        });
      }
    });
  }

  createNew(): void {
    const request: ClientRequest = {
      fullName: this.fullName,
      email: this.email,
      telephone: this.telephone,
    };
    this.clientService.createClient(request).subscribe({
      next: (response: CommonResponse) => {
        if (response.result) {
          this.globalService.showResult(
            '¡Perfecto!',
            'El cliente se creó correctamente',
            'success',
            () => this.goToSaveRedirect()
          );
        } else {
          this.globalService.showResult(
            'Advertencia!',
            'Lo sentimos, no pudimos crear el cliente',
            'warning',
            () => this.goToSaveRedirect()
          );
        }
      },
      error: (err) =>
        this.globalService.handleError(err, this.goToSaveRedirect),
    });
  }

  updateClient(): void {
    const request: ClientRequest = {
      id: this.id,
      userId: this.userId,
      fullName: this.fullName,
      email: this.email,
      telephone: this.telephone,
    };
    this.clientService.updateClient(request).subscribe({
      next: (response: CommonResponse) => {
        if (response.result) {
          this.globalService.showResult(
            '¡Perfecto!',
            'El cliente se actualizó correctamente',
            'success',
            () => this.goToSaveRedirect()
          );
        } else {
          this.globalService.showResult(
            'Advertencia!',
            'Lo sentimos, no pudimos actualizar el cliente',
            'warning',
            () => this.goToSaveRedirect()
          );
        }
      },
      error: (err) =>
        this.globalService.handleError(err, this.goToSaveRedirect),
    });
  }

  goToClientList(): void {
    this.router.navigate(['/client-list']);
  }

  goToinsuranceList(): void {
    this.router.navigate(['/insurance-list/' + this.id]);
  }

  goToSaveRedirect(): void {
    if (this.userRole === 'ADMIN') {
      this.goToClientList();
    } else {
      this.globalService.setLoading(false);
    }
  }
}
