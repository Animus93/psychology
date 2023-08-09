import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Iitem } from 'src/app/interfaces/item.interface';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.css']
})
export class TariffsComponent {
  constructor(private itemService: ItemsService) {}
  data$: Observable<Iitem[]> = this.itemService.getItems();
}
