import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ItemsService } from 'src/app/services/items.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css'],
})
export class AdminItemsComponent {
  constructor(
    private itemsService: ItemsService,
    private modal: ModalService,
    private notification: NotificationService
  ) {}
  items$: Observable<Iitem[]> = this.itemsService.itemsDataBSubject$;

  visible: boolean = !true;
  private subscriptions$: Subscription = new Subscription();

  ngOnInit(): void {
    const fetchItems$ = this.itemsService.getItems().subscribe((data) => {
      if (data.length > 0) {
        this.itemsService.itemsDataBSubject$.next(data);
      }
    });
    this.subscriptions$.add(fetchItems$);
  }

  toggle() {
    this.visible = !this.visible;
  }

  getImg(img: string): string {
    return `url(${img})`;
  }

  addItem() {
    this.modal.setType('item-edit-form');
    this.modal.switchVisibility();
  }

  editItem(item: Iitem) {
    this.modal.setType('item-edit-form');
    this.modal.switchVisibility();
    this.modal.setItemData(item);
  }

  deleteItem(item: Iitem) {
    if (item.id) {
      const deleteItem$ = this.itemsService
        .deleteItem(item.id)
        .subscribe((data) => {
          const prepereData: Iitem[] =
            this.itemsService.itemsDataBSubject$.value.filter(
              (item) => item.id !== data.id
            );
          this.itemsService.itemsDataBSubject$.next(prepereData);
          this, this.notification.swithcVisible();
          this.notification.setData(`${data.title} - удален из списка товаров`);
        });
      this.subscriptions$.add(deleteItem$);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
