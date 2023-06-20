import {Component, Input} from '@angular/core';
import { PostService } from "../../../services/post-service";
import { IPost } from "../../../interfaces/post.interface";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {

  @Input() category?: string;

  posts: IPost[] = [
    {
      _id: 1,
      creator: "AdventurerX",
      title: "Chronicles of Eternia",
      message: "Embark on a thrilling adventure through the enchanted realm of Eternia. " +
        "Uncover ancient mysteries, battle fearsome creatures, and unlock the secrets of a " +
        "world on the brink of darkness. Your destiny awaits in the Chronicles of Eternia, " +
        "where heroes rise and legends are born " +
        "Embark on a thrilling adventure through the enchanted realm of Eternia. " +
        "Uncover ancient mysteries, battle fearsome creatures, and unlock the secrets of a " +
        "world on the brink of darkness. Your destiny awaits in the Chronicles of Eternia, " +
        "where heroes rise and legends are born" +
        "Embark on a thrilling adventure through the enchanted realm of Eternia. " +
        "Uncover ancient mysteries, battle fearsome creatures, and unlock the secrets of a " +
        "world on the brink of darkness. Your destiny awaits in the Chronicles of Eternia, " +
        "where heroes rise and legends are born" +
        "Embark on a thrilling adventure through the enchanted realm of Eternia. " +
        "Uncover ancient mysteries, battle fearsome creatures, and unlock the secrets of a " +
        "world on the brink of darkness. Your destiny awaits in the Chronicles of Eternia, " +
        "where heroes rise and legends are born.",
      createdAt: 1,
      updatedAt: 1,
      deleted: false,
      category: "campaigns"
    }
  ]
  filteredPosts: IPost[] = []

  constructor(private postService: PostService) {}

  /**
  ngOnInit(): void {
    this.getPosts()
  }
   **/

  ngOnChanges() {
    this.filterPosts();
  }

  getPosts(): void {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts);
  }

  private filterPosts() {
    if (this.category) {
      this.filteredPosts = this.posts.filter(post => post.category === this.category);
    } else {
      this.filteredPosts = this.posts;
    }
  }

}
