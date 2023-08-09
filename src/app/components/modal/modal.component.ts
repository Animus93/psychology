import { Component, HostListener } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(public modal: ModalService) {}
  screenWidth: number = 0;

  test(e: any) {
    console.dir(e.target.className);
    console.dir(e.currentTarget.className);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (
      this.modal.visibility == true &&
      this.modal.getType() === 'navigation'
    ) {
      this.screenWidth = event.target.innerWidth;
      if (this.screenWidth >= 877) {
        return this.modal.switchVisibility();
      }
    }
  }
}
