import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  get activeUser() {
    return this.authService.activeUser;
  }

  notifications: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getRequests();
    this.getInvites();
  }

  getRequests() {
    this.api.getRequests(this.activeUser.id).subscribe({
      next: (requests: any) => {
        const requestsCount = requests.length;
        this.notifications += requestsCount;
      },
    });
  }

  getInvites() {
    this.api.getInvites(this.activeUser.id).subscribe({
      next: (invites: any) => {
        const invitesCount = invites.length;
        this.notifications += invitesCount;
      },
    });
  }

  logout() {
    this.router.navigateByUrl('/auth/login');
    this.authService.logout().subscribe();
  }
}
