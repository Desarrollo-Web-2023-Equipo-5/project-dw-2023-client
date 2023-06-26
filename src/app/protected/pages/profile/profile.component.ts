import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { mergeMap } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;

  get activeUser(): User | null {
    return this.authService.activeUser;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(mergeMap(params => this.apiService.getUserById(params['id'])))
      .subscribe({
        next: res => {
          this.user = res.user as User;
        },
      });
  }
}
