import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Notification } from 'src/app/interfaces/notification.interface';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  get activeUser() {
    return this.authService.activeUser;
  }

  requests: any[] = [];
  invites: any[] = [];
  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getRequests();
    this.getInvites();
  }

  getRequests() {
    this.api.getRequests(this.activeUser.id).subscribe({
      next: (requests: any) => {
        this.requests = requests;
      },
    });
  }

  getInvites() {
    this.api.getInvites(this.activeUser.id).subscribe({
      next: (invites: any) => {
        this.invites = invites;
      },
    });
  }

  acceptRequest(request: any) {}

  rejectRequest(request: any) {}

  deleteRequest(request: any) {}
}
