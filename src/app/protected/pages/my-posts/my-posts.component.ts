import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../interfaces/campaign.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent {
  get activeUser() {
    return this.auth.activeUser;
  }

  campaignPosts: Campaign[] = [];

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit(): void {
    this.api.getCurrentUserCampaigns(this.activeUser.id).subscribe({
      next: campaigns => {
        this.campaignPosts = campaigns;
      },
    });
  }
}
