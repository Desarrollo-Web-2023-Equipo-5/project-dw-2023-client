import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, PublicRoutingModule, MaterialModule],
})
export class PublicModule {}
