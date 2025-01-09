import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { InsuranceService } from '../../services/insurance.service';
import { InsuranceResponse } from '../../interfaces/insurance.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { CommonResponse } from '../../interfaces/common.interface';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insurance-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    CommonModule,
  ],
  templateUrl: './insurance-list.component.html',
  styleUrl: './insurance-list.component.scss',
})
export class InsuranceListComponent implements OnInit {
  public userRole: string = '';

  public displayedColumns: string[] = [
    'id',
    'type',
    'insuredAmount',
    'startDate',
    'expirationDate',
    'actions',
  ];
  public list: MatTableDataSource<InsuranceResponse> =
    new MatTableDataSource<InsuranceResponse>([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  private clientId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private insuranceService: InsuranceService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    localStorage.removeItem('originClientId');
    this.userRole = localStorage.getItem('role')
      ? localStorage.getItem('role')!.toString()
      : '';
    this.getAllInsurances();
  }

  getAllInsurances(): void {
    let toDoOrRedirect: string | Function | null =
      this.globalService.getToDoOrRedirect();
    this.route.paramMap.subscribe((params) => {
      this.clientId = params.get('id') ? params.get('id')!.toString() : '0';
      this.insuranceService.getInsuranceList(this.clientId).subscribe({
        next: (response: InsuranceResponse[]) => {
          this.list.data = response;
          this.list.sort = this.sort;
          this.globalService.setLoading(false);
        },
        error: (err) => this.globalService.handleError(err, toDoOrRedirect),
      });
    });
  }

  applyFilter(keyup: KeyboardEvent) {
    const filterValue = (keyup.target as HTMLInputElement).value;
    this.list.filter = filterValue.trim().toLowerCase();
  }

  createNew(): void {
    localStorage.setItem('originClientId', this.clientId);
    this.router.navigate(['/insurance-profile/0']);
  }

  edit(id: string): void {
    localStorage.setItem('originClientId', this.clientId);
    this.router.navigate(['/insurance-profile/' + id]);
  }

  goToClientList(): void {
    this.router.navigate(['/client-list']);
  }

  goToClientt(): void {
    this.route.paramMap.subscribe((params) => {
      let clientId: string = '';
      const clientIdSesion = localStorage.getItem('clientId');
      if (clientIdSesion) {
        clientId = clientIdSesion;
      } else {
        clientId = params.get('id') ? params.get('id')!.toString() : '0';
      }
      this.router.navigate(['/client-profile/' + clientId]);
    });
  }

  askDelete(id: string): void {
    Swal.fire({
      title: '¡Advertencia!',
      html: '¿Estas seguro que deseas eliminar esta póliza?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.insuranceService.deletetInsurance(id).subscribe({
          next: (response: CommonResponse) => {
            if (response.result) {
              this.globalService.showResult(
                '¡Perfecto!',
                'La póliza se elimino correctamente',
                'success',
                () => this.getAllInsurances()
              );
            } else {
              this.globalService.showResult(
                'Advertencia!',
                'Lo sentimos, no pudimos eliminar la póliza',
                'warning',
                () => this.getAllInsurances()
              );
            }
          },
          error: (err) => this.globalService.handleError(err),
        });
      }
    });
  }
}
