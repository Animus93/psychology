import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public modal: ModalService,
    public notification: NotificationService
  ) {}
}
