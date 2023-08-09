import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(public notification: NotificationService) {}
  audio: any;
  interval: any;

  ngOnInit() {
    this.playAudio();
    this.limitView();
  }

  playAudio() {
    this.audio = new Audio('assets/mp3/tone.mp3');
    this.audio.play();
  }

  limitView() {
    this.interval = setInterval(() => {
      this.switchVisibility();
    }, 5000);
  }

  switchVisibility() {
    this.notification.swithcVisible();
    clearInterval(this.interval);
  }
}
