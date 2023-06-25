import {Component, Input} from '@angular/core';
import { IPost } from "../../../interfaces/post.interface";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {

  @Input() filteredPosts: IPost[] = [];

}
