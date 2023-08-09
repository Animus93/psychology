import { trigger, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  animations: [
    trigger('fadeInAnimationTitle', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0%)' })),
      ]),
    ]),
    trigger('fadeInAnimationButton1', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50%)' }),
        animate('900ms', style({ opacity: 1, transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('fadeInAnimationButton2', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50%)' }),
        animate('900ms', style({ opacity: 1, transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class PreviewComponent {
  constructor(private itemService: ItemsService) {}
  data$: Observable<Iitem[]> = this.itemService.getItems();
  subscriptions: Subscription = new Subscription();
  price?: number;

  ngOnInit() {
    const Items = this.data$.subscribe((data) => {
      const minPrice = Math.min(...data.map((obj) => Number(obj.price)));
      this.price = minPrice;
    });
    this.subscriptions.add(Items);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
