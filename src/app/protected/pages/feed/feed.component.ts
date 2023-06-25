import {Component, OnInit} from '@angular/core';
import { PostService } from "../../../services/post-service";
import { IPost } from "../../../interfaces/post.interface";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {

  constructor(private postService: PostService) {}

  campaignPosts: IPost[] = []
  lfgPosts: IPost[] = []

  getCampaignPosts(): void {
    this.postService.getPostsByParameter("campaign").subscribe(posts => this.campaignPosts = posts);
  }

  getLfgPosts(): void {
    this.postService.getPostsByParameter("lfg").subscribe(posts => this.lfgPosts = posts)
  }

  onTabClick(event: MatTabChangeEvent) {
    console.log(event.tab.textLabel)
    if (event.tab.textLabel === "Campaigns") {
      this.getCampaignPosts()
    } else if (event.tab.textLabel === "Looking for group") {
      this.getLfgPosts()
    }
    console.log('Tab clicked', event);
  }

}
