import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TelegramApiService } from 'src/app/services/telegram-api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item!: Iitem;
  constructor(
    private telegram: TelegramApiService,
    private notification: NotificationService,
    private modal: ModalService
  ) {}

  subscriptions: Subscription = new Subscription();

  getImg(): string {
    return `url(${this.item.img})`;
  }

  createOrder() {
    // const sendMessage$ = this.telegram
    //   .sendTelegramMessage({
    //     title: item.title,
    //     img: item.img,
    //     price: item.price,
    //     time: item.time,
    //     description: item.description,
    //   })
    //   .subscribe((response) => {
    //     if (response.ok) {
    //       this.notification.swithcVisible();
    //       this.notification.setData(
    //         'заказ принят в ближайщее время мы свяжемся с вами'
    //       );
    //     }
    //     this.subscriptions.add(sendMessage$);
    //   });
    this.modal.setItemData(this.item);
    this.modal.setType('t-btn-from');
    this.modal.switchVisibility()
  }
  ngOnDestroy() {
    this.modal.setItemData(null);
    this.subscriptions.unsubscribe();
  }
}
