import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validateTokenGuard } from './guards/validate-token.guard';
import { NotificationsComponent } from './protected/pages/notifications/notifications.component';
const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () =>
      import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'dashboard',
    canActivate: [validateTokenGuard],
    loadChildren: () =>
      import('./protected/protected.module').then(m => m.ProtectedModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
