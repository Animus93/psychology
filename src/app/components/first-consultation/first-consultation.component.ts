import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-first-consultation',
  templateUrl: './first-consultation.component.html',
  styleUrls: ['./first-consultation.component.css']
})
export class FirstConsultationComponent {
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
