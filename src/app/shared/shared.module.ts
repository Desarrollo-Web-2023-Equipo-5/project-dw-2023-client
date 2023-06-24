import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { DevNavComponent } from './dev-nav/dev-nav.component';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [DevNavComponent, ConfirmDialogComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
  exports: [DevNavComponent],
})
export class SharedModule {}
