import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TelegramApiService } from 'src/app/services/telegram-api.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  constructor(
    public modal: ModalService,
    private telegtam: TelegramApiService,
    private notification: NotificationService
  ) {}
  item: Iitem | null = this.modal.getItemData();
  isValidate: boolean = false;
  subscriptions: Subscription = new Subscription();
  getImg() {
    return `url(${this.item?.img})`;
  }
  closeModal() {
    this.modal.setType('');
    this.modal.switchVisibility()
  }

  applyForm = new FormGroup({
    contact: new FormControl('+7(959)', [
      Validators.required,
      Validators.minLength(14),
    ]),
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    caption: new FormControl(
      `Здравствуйте меня интересует ${this.modal.getItemData()?.title}`
    ),
    img: new FormControl(this.modal.getItemData()?.img),
  });
  submitApplication() {
    if (this.applyForm.status !== 'VALID') {
      this.isValidate = true;
      return;
    }
    const sendMessage$ = this.telegtam
      .sendTelegramOrder({
        contact: this.applyForm.value.contact ?? '',
        name: this.applyForm.value.name ?? '',
        caption: this.applyForm.value.caption ?? '',
        img: this.applyForm.value.img ?? '',
      })
      .subscribe((response) => {
        if (response.ok) {
          this.notification.swithcVisible();
          this.notification.setData(
            'Заказ принят в ближайщее время мы свяжемся с вами'
          );
          this.modal.setType('');
        }
      });
    this.subscriptions.add(sendMessage$);
  }
  ngOnDestroy() {
    this.modal.setItemData(null);
    this.subscriptions.unsubscribe();
  }
}
