import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FeedComponent,
    PostComponent,
    PostListComponent,
    BottomNavComponent,
    MainComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule, MaterialModule],
})
export class ProtectedModule {}
