import { Component, Input, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Comment } from '../../../interfaces/comment';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
})
export class CommentsSectionComponent {
  get activeUser() {
    return this.authService.activeUser;
  }

  @Input() userRef: string | null = null;
  @Input() postRef: string | null | undefined = null;

  comments: Comment[] = [];
  isLoadingComments: boolean = false;

  commentForm = this.fb.group({
    comment: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoadingComments = true;
    const commentsQuery = this.postRef
      ? `?postRef=${this.postRef}`
      : `?userRef=${this.userRef}`;
    this.apiService.getComments(commentsQuery).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
        this.isLoadingComments = false;
      },
      error: err => {
        this.toastr.error(err.error.errors[0].msg);
        this.isLoadingComments = false;
      },
    });
  }

  ngOnChanges(): void {
    this.isLoadingComments = true;
    const commentsQuery = this.postRef
      ? `?postRef=${this.postRef}`
      : `?userRef=${this.userRef}`;
    this.apiService.getComments(commentsQuery).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
        this.isLoadingComments = false;
      },
      error: err => {
        this.toastr.error(err.error.errors[0].msg);
        this.isLoadingComments = false;
      },
    });
  }

  sendComment(): void {
    if (!this.commentForm.value.comment) return;
    const newComment: Comment = {
      userRef: this.userRef,
      postRef: this.postRef,
      creator: this.authService.activeUser,
      content: this.commentForm.value.comment,
    };
    this.apiService.createComment(newComment).subscribe({
      next: (id: string) => {
        newComment.id = id;
        this.comments.push(newComment);
        this.commentForm.reset();
      },
      error: err => {
        console.error(err);
        this.toastr.error(err.error.errors[0].msg);
      },
    });
  }

  deleteComment(comment: Comment): void {
    const index = this.comments.findIndex(c => c.id === comment.id);
    if (index === -1) return;
    this.comments.splice(index, 1);
  }
}
