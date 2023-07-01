import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { mergeMap } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { FileUploadService } from '../../../services/file-upload.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../../../shared/upload-file-dialog/upload-file-dialog.component';
import { CampaignSelectorDialogComponent } from '../../../shared/campaign-selector-dialog/campaign-selector-dialog.component';
import { Request } from '../../../interfaces/request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;

  isLoadingLookingForGroup = false;

  get activeUser(): User | null {
    return this.authService.activeUser;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    public dialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(mergeMap(params => this.apiService.getUserById(params['id'])))
      .subscribe({
        next: (user: User) => {
          this.user = user;
        },
      });
  }

  openImageDialog() {
    if (!this.activeUser || this.activeUser.id !== this.user.id) {
      return;
    }
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      width: '30em',
      data: {
        id: this.user.id,
        collection: 'users',
      },
    });
    dialogRef.afterClosed().subscribe(newImgUrl => {
      if (newImgUrl) {
        this.user.img = newImgUrl;
      }
    });
  }

  toogleLookingForGroup() {
    if (!this.activeUser || this.activeUser.id !== this.user.id) {
      return;
    }
    this.isLoadingLookingForGroup = true;
    this.apiService
      .updateUser(this.user.id, {
        isLookingForGroup: !this.user.isLookingForGroup,
      })
      .subscribe({
        next: res => {
          this.user.isLookingForGroup = res.user.isLookingForGroup;
          this.isLoadingLookingForGroup = false;
        },
        error: err => {
          this.isLoadingLookingForGroup = false;
        },
      });
  }

  inviteToCampaign() {
    if (this.activeUser?.id === this.user.id) {
      return;
    }
    const dialog = this.dialog.open(CampaignSelectorDialogComponent, {
      width: '30em',
      data: {
        userId: this.activeUser?.id,
        toInviteName: this.user.username,
      },
    });
    dialog.afterClosed().subscribe({
      next: campaignId => {
        if (!campaignId) {
          return;
        }
        const newRequest: Request = {
          user: this.user.id,
          campaign: campaignId,
          isSentByCreator: true,
        };

        this.apiService.sendRequest(newRequest).subscribe({
          next: res => {
            if (res.id) {
              this.toast.success('Invitation to campaign sent!');
            }
          },
          error: err => {
            this.toast.error(err.error.errors[0].msg);
          },
        });
      },
    });
  }
}
