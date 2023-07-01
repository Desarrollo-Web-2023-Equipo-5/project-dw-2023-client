import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { DevNavComponent } from './dev-nav/dev-nav.component';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { CampaignSelectorDialogComponent } from './campaign-selector-dialog/campaign-selector-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DevNavComponent,
    ConfirmDialogComponent,
    UploadFileDialogComponent,
    CampaignSelectorDialogComponent,
  ],
  imports: [CommonModule, AppRoutingModule, MaterialModule, FormsModule],
  exports: [DevNavComponent],
})
export class SharedModule {}
