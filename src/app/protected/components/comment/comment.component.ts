import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../../interfaces/comment';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  get activeUser() {
    return this.authService.activeUser;
  }

  editMode: boolean = false;

  @Input() comment!: Comment;
  @Output() deleteCommentEvent = new EventEmitter<Comment>();

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  deleteComment() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Comment',
        message: 'Are you sure you want to delete this comment?',
      },
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (!result) return;
        if (!this.comment.id) return;
        this.apiService.deleteComment(this.comment.id).subscribe({
          next: () => {
            this.deleteCommentEvent.emit(this.comment);
            this.toastr.success('Comment deleted successfully');
          },
          error: () => {
            this.toastr.error('Error deleting comment');
          },
        });
      },
    });
  }

  updateComment() {
    this.editMode = true;
  }
}
