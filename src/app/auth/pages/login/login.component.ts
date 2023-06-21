import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword: boolean = true;

  loginForm: FormGroup = this.fb.group({
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  login() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: resp => {
        if (resp.token) {
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: err => {
        console.error(err);
      },
    });
  }
}
