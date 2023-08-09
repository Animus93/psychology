import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ItemsService } from 'src/app/services/items.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styleUrls: ['./item-edit-form.component.css'],
})
export class ItemEditFormComponent {
  // item = this.modal.getData()
  // получить итем
  constructor(
    private itemService: ItemsService,
    private modal: ModalService,
    private notification: NotificationService
  ) {}

  private subscriptions$: Subscription = new Subscription();
  item: Iitem | null = this.modal.getItemData();

  applyForm = new FormGroup({
    url: new FormControl(this.item?.img || '', [Validators.required]),
    title: new FormControl(this.item?.title || '', [Validators.required]),
    time: new FormControl(this.item?.time || '', [Validators.required]),
    price: new FormControl(this.item?.price || '', [Validators.required]),
    description: new FormControl(this.item?.description || '', [
      Validators.required,
    ]),
  });

  closeModal() {
    this.modal.setType('');
    this.modal.switchVisibility();
  }
  getUrl(): string {
    return `url(${this.applyForm.value.url})`;
  }
  clear() {
    this.applyForm.value.url = '';
  }
  submitApplication() {
    const data: Iitem = {
      id: this.item?.id,
      title: this.applyForm.value.title || '',
      time: this.applyForm.value.time || '',
      img: this.applyForm.value.url || '',
      price: this.applyForm.value.price || '',
      description: this.applyForm.value.description || '',
    };
    if (this.item) {
      const putItem$ = this.itemService.putItem(data).subscribe((data) => {
        this.putQuery(data);
        this.notification.swithcVisible();
        this.notification.setData(`Товар ${data.title} обновлен`);
      });
      return this.subscriptions$.add(putItem$);
    }
    const sendItem$ = this.itemService.postItem(data).subscribe((data) => {
      this.postQuery(data);
      this.notification.swithcVisible();
      this.notification.setData(`Товар ${data.title} добавлен`);
    });
    return this.subscriptions$.add(sendItem$);
  }

  putQuery(data: Iitem): void {
    const prepereData: Iitem[] = this.itemService.itemsDataBSubject$.value.map(
      (item) => {
        if (item.id == data.id) {
          item.title = data.title;
          item.img = data.img;
          item.price = data.price;
          item.description = data.description;
        }
        return item;
      }
    );
    this.itemService.itemsDataBSubject$.next(prepereData);
    this.closeModal();
  }

  postQuery(data: Iitem) {
    this.itemService.itemsDataBSubject$.next([
      ...this.itemService.itemsDataBSubject$.value,
      data,
    ]);
    this.closeModal();
  }
  ngOnDestroy(): void {
    this.modal.setItemData(null);
    this.subscriptions$.unsubscribe();
  }
}
