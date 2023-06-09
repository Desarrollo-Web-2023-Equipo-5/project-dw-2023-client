import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { MainComponent } from './pages/main/main.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { MyPostsComponent } from './pages/my-posts/my-posts.component';
import { CampaignDetailsComponent } from './pages/campaign-details/campaign-details.component';
import { CharacterSheetComponent } from './pages/character-sheet/character-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      {
        path: 'feed',
        component: FeedComponent,
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
      },
      {
        path: 'create-campaign',
        component: CreateCampaignComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'my-posts',
        component: MyPostsComponent,
      },
      {
        path: 'campaign-details/:id',
        component: CampaignDetailsComponent,
      },
      {
        path: 'character-sheet',
        component: CharacterSheetComponent,
      },
      {
        path: '**',
        redirectTo: 'feed',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
