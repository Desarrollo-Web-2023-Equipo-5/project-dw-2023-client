import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileDialogComponent } from 'src/app/shared/upload-file-dialog/upload-file-dialog.component';
import { Request } from '../../../interfaces/request';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent {
  get activeUser() {
    return this.auth.activeUser;
  }
  @Input() campaign!: Campaign;
  hasRequested: boolean = false;
  isLoading: boolean[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.api.getCampaign(params['id']).subscribe({
        next: (campaign: Campaign) => {
          this.campaign = campaign;
          this.isLoading.push(false);

          this.api.getRequests(this.activeUser.id).subscribe({
            next: (requests: any[]) => {
              const requestDone = requests.find((request: any) => {
                if (request.campaign._id === this.campaign._id) {
                  this.hasRequested = true;
                  return true;
                }
                return false;
              });

              if (requestDone) {
                this.hasRequested = true;
                this.isLoading.push(false);
              }
              this.isLoading.push(false);
            },
          });
        },
      });
    });
  }

  updateImage() {
    if (this.activeUser.id !== this.campaign.creator.id) return;
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      width: '30em',
      data: {
        id: this.campaign._id,
        collection: 'campaigns',
      },
    });
    dialogRef.afterClosed().subscribe(newImgUrl => {
      if (newImgUrl) {
        this.campaign.img = newImgUrl;
      }
    });
  }

  joinCampaign() {
    if (this.activeUser.id === this.campaign.creator.id) return;
    if (!this.campaign) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30em',
      data: {
        title: 'Request to join campaign',
        message: `Do you want to join ${this.campaign.title}?`,
      },
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        const request: Request = {
          user: this.activeUser.id,
          campaign: this.campaign._id,
          isSentByCreator: false,
        };

        this.api.sendRequest(request).subscribe((res: any) => {
          this.hasRequested = true;
          this.toastr.success('Request sent successfully');
        });
      }
    });
  }
}
