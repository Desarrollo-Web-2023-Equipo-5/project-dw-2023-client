import { Component, Input } from '@angular/core';
import { Campaign } from '../../../interfaces/campaign.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  @Input() filteredPosts: Campaign[] = [];
}
