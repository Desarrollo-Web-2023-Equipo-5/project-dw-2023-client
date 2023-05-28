import { Component } from '@angular/core';

@Component({
  selector: 'app-dev-nav',
  templateUrl: './dev-nav.component.html',
  styleUrls: ['./dev-nav.component.scss'],
})
export class DevNavComponent {
  routes: any[] = [
    { path: '/landing', label: 'Landing' },
    { path: '/auth/login', label: 'Login' },
    { path: '/auth/register', label: 'Register' },
    { path: '/dashboard/profile', label: 'Profile' },
    { path: '/dashboard/feed', label: 'Feed' },
  ];
}
