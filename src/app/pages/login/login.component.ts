import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest, LoginResponse } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public user: string = '';
  public password: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  onSubmit(): void {
    let request: LoginRequest = {
      user: this.user,
      password: this.password,
    };
    this.authService.login(request).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('role', response.role.toUpperCase());
        if (response.role.toUpperCase() === 'ADMIN') {
          this.router.navigate(['/client-list']);
        } else {
          localStorage.setItem('clientId', response.client.id);
          this.router.navigate(['/client-profile/' + response.client.id]);
        }
        this.globalService.setLoading(false);
      },
      error: (err) => this.globalService.handleError(err),
    });
  }
}
