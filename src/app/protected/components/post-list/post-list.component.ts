import { Component } from '@angular/core';
import { PostService } from "../../services/post-service";
import { PostComponent } from "../post/post.component";
import { IPost } from "../../interfaces/post.interface";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {

  posts: IPost[] = []

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(): void {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts);
  }

}
