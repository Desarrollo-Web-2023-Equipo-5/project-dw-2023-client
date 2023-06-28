import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  notifications: number | undefined = undefined;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.router.navigateByUrl('/auth/login');
    this.authService.logout().subscribe();
  }
}
