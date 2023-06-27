import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Notification } from 'src/app/interfaces/notification.interface';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.api.getNotification().subscribe({
      next: (resp: Notification) => {
        this.notifications = [resp];
      },
    });
  }

  acceptNotification(notification: Notification) {}

  rejectNotification(notification: Notification) {}
}
