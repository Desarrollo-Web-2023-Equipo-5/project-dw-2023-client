import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileDialogComponent } from 'src/app/shared/upload-file-dialog/upload-file-dialog.component';

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

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.api.getCampaign(params['id']).subscribe(res => {
        this.campaign = res.campaign;
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
}
