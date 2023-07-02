import { Component, isDevMode } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  isLoading: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(email, password).subscribe({
      next: resp => {
        if (resp.token) {
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
        this.toastr.error(err.error.errors[0].msg);
      },
    });
  }

  getErrorMessage(control: string): string {
    switch (control) {
      case 'email':
        if (this.loginForm.get('email')?.hasError('required')) {
          return 'Email is required';
        }
        if (this.loginForm.get('email')?.hasError('email')) {
          return 'Email not valid';
        }
        return '';

      case 'password':
        if (this.loginForm.get('password')?.hasError('required')) {
          return 'Password is required';
        }
        return '';

      default:
        return '';
    }
  }
}
