import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../interfaces/campaign.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  constructor(private api: ApiService) {}

  campaignPosts: Campaign[] = [];
  lfgPosts: Campaign[] = [];

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns() {
    this.api.getCampaigns().subscribe({
      next: (campaigns: Campaign[]) => {
        this.campaignPosts = campaigns;
      },
    });
  }

  getLfgPosts() {
    this.api.getLookingForGroupUsers().subscribe({
      next: resp => {
        this.lfgPosts = resp.users;
      },
    });
  }

  onTabClick(event: MatTabChangeEvent) {
    if (event.tab.textLabel === 'Campaigns') {
      this.getCampaigns();
    } else if (event.tab.textLabel === 'Looking for group') {
      this.getLfgPosts();
    }
  }
}
