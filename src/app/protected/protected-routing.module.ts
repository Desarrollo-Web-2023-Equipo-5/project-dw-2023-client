import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfileComponent,
          },
          {
            path: 'posts',
            component: FeedComponent,
          },
        ],
      },
      {
        path: 'feed',
        component: FeedComponent,
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
