import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FeedComponent,
    PostComponent,
    PostListComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule],
})
export class ProtectedModule {}
