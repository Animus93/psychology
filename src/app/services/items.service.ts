import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iitem } from '../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';
import { ApiLinksService } from './api-links.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http: HttpClient, private apiLinks: ApiLinksService) {}
  itemsDataBSubject$ = new BehaviorSubject<Iitem[]>([]);

  //получить массив товаров
  getItems(): Observable<Iitem[]> {
    return this.http.get<Iitem[]>(`${this.apiLinks.DB1}/items`);
  }

  getItem(id: number) {
    return this.http.get<Iitem>(`${this.apiLinks.DB1}/items/${id}`);
  }

  postItem(data: Iitem): Observable<Iitem> {
    return this.http.post<Iitem>(`${this.apiLinks.DB1}/items`, {
      title: data.title,
      img: data.img,
      price: data.price,
      time: data.time,
      description: data.description,
    });
  }

  putItem(data: Iitem): Observable<Iitem> {
    console.log('put data ', data);
    return this.http.put<Iitem>(`${this.apiLinks.DB1}/items/${data.id}`, {
      title: data.title,
      img: data.img,
      price: data.price,
      time: data.time,
      description: data.description,
    });
  }

  deleteItem(id: number): Observable<Iitem> {
    return this.http.delete<Iitem>(`${this.apiLinks.DB1}/items/${id}`);
  }
}
