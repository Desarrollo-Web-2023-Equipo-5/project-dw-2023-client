import { Component, Input } from '@angular/core';
import { Campaign } from '../../../interfaces/campaign.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post?: Campaign;
}
