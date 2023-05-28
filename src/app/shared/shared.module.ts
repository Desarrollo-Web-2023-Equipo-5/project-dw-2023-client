import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { DevNavComponent } from './dev-nav/dev-nav.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [DevNavComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
  exports: [DevNavComponent],
})
export class SharedModule {}
