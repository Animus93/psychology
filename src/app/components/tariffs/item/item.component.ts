import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item!: Iitem;
  constructor(
    private modal: ModalService
  ) {}

  subscriptions: Subscription = new Subscription();

  getImg(): string {
    return `url(${this.item.img})`;
  }

  createOrder() {
    this.modal.setItemData(this.item);
    this.modal.setType('t-btn-from');
    this.modal.switchVisibility()
  }
  ngOnDestroy() {
    this.modal.setItemData(null);
    this.subscriptions.unsubscribe();
  }
}
