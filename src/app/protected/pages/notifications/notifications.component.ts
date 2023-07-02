import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Notification } from 'src/app/interfaces/notification.interface';
import { AuthService } from '../../../services/auth.service';
import { Campaign } from '../../../interfaces/campaign.interface';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private api: ApiService,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

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

  acceptRequest(request: any, type: 'requests' | 'invites') {
    this.api.getCampaign(request.campaign._id).subscribe({
      next: (campaign: Campaign) => {
        if (campaign.currentPlayers.includes(request.user.id)) {
          this.toast.error('User is already in campaign!');
          return;
        }
        if (campaign.currentPlayers.length >= campaign.playersNeeded) {
          this.toast.error('Campaign is full!');
          return;
        }
        campaign.currentPlayers.push(request.user.id);
        this.api.updateCampaign(campaign._id!, campaign).subscribe({
          next: (res: any) => {
            this.api
              .updateRequest(request._id!, { status: 'accepted' })
              .subscribe({
                next: (res: any) => {
                  if (type === 'requests') {
                    this.requests.find(r => r._id === request._id).status =
                      'accepted';
                  } else {
                    this.invites.find(r => r._id === request._id).status =
                      'accepted';
                  }
                  this.toast.success('Request accepted!');
                },
                error: (err: any) => {
                  this.toast.error(err.error.errors[0].msg);
                },
              });
          },
        });
      },
    });
  }

  rejectRequest(request: any, type: 'requests' | 'invites') {
    this.api.updateRequest(request._id!, { status: 'rejected' }).subscribe({
      next: (res: any) => {
        if (type === 'requests') {
          this.requests.find(r => r._id === request._id).status = 'rejected';
          this.toast.success('Request rejected!');
        } else {
          this.invites.find(r => r._id === request._id).status = 'rejected';
          this.toast.success('Invite rejected!');
        }
      },
      error: (err: any) => {
        this.toast.error(err.error.errors[0].msg);
      },
    });
  }

  deleteRequest(request: any) {}
}
