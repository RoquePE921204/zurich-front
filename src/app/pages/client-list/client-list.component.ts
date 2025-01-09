import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GlobalService } from '../../services/global.service';
import { ClientService } from '../../services/client.service';
import { ClientResponse } from '../../interfaces/client.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonResponse } from '../../interfaces/common.interface';

@Component({
  selector: 'app-client-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'telephone',
    'actions',
  ];
  public list: MatTableDataSource<ClientResponse> =
    new MatTableDataSource<ClientResponse>([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  constructor(
    private router: Router,
    private clientService: ClientService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    localStorage.removeItem('originClientId');
    this.getAllClients();
  }

  getAllClients(): void {
    let toDoOrRedirect: Function = this.globalService.logout;
    this.clientService.getClientList().subscribe({
      next: (response: ClientResponse[]) => {
        this.list.data = response;
        this.list.sort = this.sort;
        this.globalService.setLoading(false);
      },
      error: (err) => this.globalService.handleError(err, toDoOrRedirect),
    });
  }

  applyFilter(keyup: KeyboardEvent) {
    const filterValue = (keyup.target as HTMLInputElement).value;
    this.list.filter = filterValue.trim().toLowerCase();
  }

  createNew(): void {
    this.router.navigate(['/client-profile/0']);
  }

  edit(id: string): void {
    this.router.navigate(['/client-profile/' + id]);
  }

  goToInsurances(id: string): void {
    this.router.navigate(['/insurance-list/' + id]);
  }

  askDelete(id: string): void {
    Swal.fire({
      title: '¡Advertencia!',
      html: '¿Estas seguro que deseas eliminar este cliente?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deletetClient(id).subscribe({
          next: (response: CommonResponse) => {
            if (response.result) {
              this.globalService.showResult(
                '¡Perfecto!',
                'El cliente se elimino correctamente',
                'success',
                () => this.getAllClients()
              );
            } else {
              this.globalService.showResult(
                'Advertencia!',
                'Lo sentimos, no pudimos eliminar el cliente',
                'warning',
                () => this.getAllClients()
              );
            }
          },
          error: (err) => this.globalService.handleError(err),
        });
      }
    });
  }
}
