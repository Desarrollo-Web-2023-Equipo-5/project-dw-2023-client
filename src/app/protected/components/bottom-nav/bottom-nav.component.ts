import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  openProfile() {
    this.router.navigateByUrl(
      `dashboard/profile/${this.authService.activeUser.id}`
    );
  }
}
