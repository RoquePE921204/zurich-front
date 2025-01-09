import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceService } from '../../services/insurance.service';
import { GlobalService } from '../../services/global.service';
import {
  InsuranceRequest,
  InsuranceResponse,
} from '../../interfaces/insurance.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonResponse } from '../../interfaces/common.interface';

@Component({
  selector: 'app-insurance-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './insurance-profile.component.html',
  styleUrl: './insurance-profile.component.scss',
})
export class InsuranceProfileComponent implements OnInit {
  public isNew: boolean = true;
  public userRole: string = '';

  public id?: string;
  public clientId: string = '';
  public type: 'Vida' | 'Automóvil' | 'Salud' | 'Hogar' = 'Vida';
  public insuredAmount: number = 10000;
  public startDate: string = '';
  public expirationDate: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('role')
      ? localStorage.getItem('role')!.toString()
      : '';
    this.getInsurance();
  }

  getInsurance(): void {
    const toDoOrRedirect: string | Function | null = this.getToDoOrRedirect();
    this.route.paramMap.subscribe((params) => {
      let insuranceId: string = params.get('id')
        ? params.get('id')!.toString()
        : '0';
      if (insuranceId != '0') {
        this.insuranceService.getInsurance(insuranceId).subscribe({
          next: (response: InsuranceResponse) => {
            this.isNew = false;
            this.id = response.id;
            this.clientId = response.clientId;
            this.type = response.type;
            this.insuredAmount = response.insuredAmount;
            this.startDate = response.startDate;
            this.expirationDate = response.expirationDate;
            this.globalService.setLoading(false);
          },
          error: (err) => this.globalService.handleError(err, toDoOrRedirect),
        });
      } else {
        this.clientId = localStorage.getItem('originClientId')
          ? localStorage.getItem('originClientId')!
          : '';
      }
    });
  }

  createNew(): void {
    const request: InsuranceRequest = {
      clientId: this.clientId,
      type: this.type,
      insuredAmount: this.insuredAmount,
      startDate: this.startDate,
      expirationDate: this.expirationDate,
    };
    this.insuranceService.createInsurance(request).subscribe({
      next: (response: CommonResponse) => {
        if (response.result) {
          this.globalService.showResult(
            '¡Perfecto!',
            'La póliza se creó correctamente',
            'success',
            () => this.goToinsuranceList()
          );
        } else {
          this.globalService.showResult(
            'Advertencia!',
            'Lo sentimos, no pudimos crear la póliza',
            'warning',
            () => this.goToinsuranceList()
          );
        }
      },
      error: (err) =>
        this.globalService.handleError(err, this.goToinsuranceList),
    });
  }

  updateInsurance(): void {
    const request: InsuranceRequest = {
      id: this.id,
      clientId: this.clientId,
      type: this.type,
      insuredAmount: this.insuredAmount,
      startDate: this.startDate,
      expirationDate: this.expirationDate,
    };
    this.insuranceService.updateInsurance(request).subscribe({
      next: (response: CommonResponse) => {
        if (response.result) {
          this.globalService.showResult(
            '¡Perfecto!',
            'La póliza se actualió correctamente',
            'success',
            () => this.goToinsuranceList()
          );
        } else {
          this.globalService.showResult(
            'Advertencia!',
            'Lo sentimos, no pudimos actualizar la póliza',
            'warning',
            () => this.goToinsuranceList()
          );
        }
      },
      error: (err) =>
        this.globalService.handleError(err, this.goToinsuranceList),
    });
  }

  goToinsuranceList(): void {
    const toDoOrRedirect: string | Function | null = this.getToDoOrRedirect();
    if (typeof toDoOrRedirect === 'string') {
      this.router.navigate([toDoOrRedirect]);
    } else if (typeof toDoOrRedirect === 'function') {
      toDoOrRedirect();
    }
  }

  getToDoOrRedirect(): string | Function | null {
    let toDoOrRedirect: string | Function | null = '';
    const clientIdSesion = localStorage.getItem('originClientId');
    if (clientIdSesion) {
      toDoOrRedirect = `/insurance-list/${clientIdSesion}`;
    } else if (this.userRole === 'ADMIN') {
      toDoOrRedirect = '/client-list';
    } else {
      toDoOrRedirect = this.globalService.logout;
    }
    return toDoOrRedirect;
  }
}
