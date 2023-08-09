import { Injectable } from '@angular/core';
import { Iitem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}
  visibility: Boolean = false;
  type: string = '';
  itemData?: Iitem | null;

  // дата для модального окна (по необходимости для Iitem)
  setItemData(newData: Iitem | null): Iitem | null {
    return (this.itemData = newData);
  }

  getItemData(): Iitem | null {
    if (this.itemData) {
      return this.itemData;
    }
    return null;
  }

  switchVisibility() {
    this.visibility = !this.visibility;
  }
  setType(data: string) {
    this.type = data;
  }
  getType(): string {
    return this.type;
  }
}
