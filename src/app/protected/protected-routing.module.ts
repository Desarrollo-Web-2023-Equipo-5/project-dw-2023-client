import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { MainComponent } from './pages/main/main.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { CampaignDetailsComponent } from './pages/campaign-details/campaign-details.component';

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
        path: 'campaign-details/:id',
        component: CampaignDetailsComponent,
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
