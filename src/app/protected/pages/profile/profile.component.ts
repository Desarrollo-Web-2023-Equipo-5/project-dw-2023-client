import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
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
