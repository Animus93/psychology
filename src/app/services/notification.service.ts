import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  visible: Boolean = false;
  text?: string;

  swithcVisible(): Boolean {
    return (this.visible = !this.visible);
  }

  getVisibility(): Boolean {
    return this.visible;
  }
  setData(data: string) {
    if (data.length) {
      return (this.text = data);
    }
    return;
  }

  getData() {
    return this.text;
  }
}
