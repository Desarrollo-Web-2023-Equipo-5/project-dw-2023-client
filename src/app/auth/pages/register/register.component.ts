import { Component, isDevMode } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;
  isLoading: boolean = false;

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register() {
    const { username, email, password, repeatPassword } =
      this.registerForm.value;
    if (password !== repeatPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }
    this.isLoading = true;
    this.authService.register(username, email, password).subscribe({
      next: resp => {
        if (resp.id) {
          this.toastr.success("You've been registered successfully");
          this.router.navigateByUrl('/auth/login');
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
      case 'username':
        if (this.registerForm.get('username')?.hasError('required')) {
          return 'Username is required';
        }
        return '';

      case 'email':
        if (this.registerForm.get('email')?.hasError('required')) {
          return 'Email is required';
        }
        if (this.registerForm.get('email')?.hasError('email')) {
          return 'Email not valid';
        }
        return '';

      case 'password':
        if (this.registerForm.get('password')?.hasError('required')) {
          return 'Password is required';
        }
        return '';

      case 'repeatPassword':
        if (this.registerForm.get('repeatPassword')?.hasError('required')) {
          return 'Password is required';
        }
        if (this.registerForm.get('repeatPassword')?.hasError('password')) {
          return 'Password does not match';
        }
        return '';

      default:
        return '';
    }
  }
}
