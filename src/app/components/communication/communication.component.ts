import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { TelegramApiService } from 'src/app/services/telegram-api.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css'],
})
export class CommunicationComponent {
  constructor(
    private telegram: TelegramApiService,
    private notification: NotificationService
  ) {}
  isValidate: boolean = false;

  subscriptions: Subscription = new Subscription();

  applyForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.required,
    ]),
    contact: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.required,
    ]),
    review: new FormControl('', [
      Validators.maxLength(150),
      Validators.minLength(4),
      Validators.required,
    ]),
  });
  get descriptionLength(): number {
    const value = this.applyForm.get('review')?.value?.length;
    if (value !== undefined) {
      const count = 150 - value >= 0 ? 150 - value : 0;
      return count;
    }
    return 0;
  }

  checkField(field: string): boolean {
    if (
      this.applyForm.get(`${field}`)?.invalid &&
      (this.applyForm.get(`${field}`)?.dirty ||
        this.applyForm.get(`${field}`)?.touched ||
        this.isValidate)
    ) {
      return true;
    }
    return false;
  }
  submitApplication() {
    if (this.applyForm.status !== 'VALID') {
      this.isValidate = true;
    } else {
      const sendMessage$ = this.telegram
        .sendTelegramMessage({
          contact: this.applyForm.value.contact ?? '',
          name: this.applyForm.value.name ?? '',
          review: this.applyForm.value.review ?? '',
        })
        .subscribe((response) => {
          if (response.ok) {
            this.applyForm.reset();
            this.notification.swithcVisible();
            this.notification.setData('В ближайщее время я свяжусь с вами');
          }
        });
        this.subscriptions.add(sendMessage$);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
