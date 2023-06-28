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
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { CommentComponent } from './components/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { MyPostsComponent } from './pages/my-posts/my-posts.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FeedComponent,
    PostComponent,
    PostListComponent,
    BottomNavComponent,
    MainComponent,
    TopNavComponent,
    CommentComponent,
    CommentsSectionComponent,
    CreatePostComponent,
    CreateCampaignComponent,
    NotificationsComponent,
    MyPostsComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ProtectedModule {}
