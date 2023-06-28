import { Component, Inject } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss'],
})
export class UploadFileDialogComponent {
  uploadImg!: File;
  isUploading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService
  ) {}

  changeImage(event: any) {
    const file = event.target.files[0];
    this.uploadImg = file;
  }

  uploadImage() {
    this.isUploading = true;
    const { collection, id } = this.data;
    this.fileUploadService
      .updateImage(this.uploadImg, collection, id)
      .subscribe({
        next: imgUrl => {
          this.dialogRef.close(imgUrl);
          this.toastr.success('Image changed successfully');
        },
        error: err => {
          this.toastr.error(err.error.errors[0].msg);
          this.isUploading = false;
        },
      });
  }
}
