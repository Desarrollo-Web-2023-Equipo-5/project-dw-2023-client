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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(mergeMap(params => this.apiService.getUserById(params['id'])))
      .subscribe({
        next: res => {
          this.user = res.user as User;
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
        user: this.user,
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
}
