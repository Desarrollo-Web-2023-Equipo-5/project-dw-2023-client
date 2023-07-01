import { Component, Input } from '@angular/core';
import { Campaign } from '../../../interfaces/campaign.interface';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post?: Campaign;
  @Input() user!: User;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.user) {
      // TODO: get user character
    }
  }
}
