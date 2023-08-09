import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iitem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class TelegramApiService {
  constructor(private http: HttpClient) {}

  private telegramBotToken: string =
    '6392083072:AAHKqaDO3sBsxcseYtu8RGG6-dfDTr-jkPU';
  private ChatId: string = '1029758975';

  sendTelegramMessage(data: any): Observable<any> {
    return this.http.post(
      `https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`,
      {
        chat_id: this.ChatId,
        text: `НОВОЕ СООБЩЕНИЕ С САЙТА
        Имя : ${data.name} 
        Контакт: ${data.contact}
        Вопрос: ${data.review}`,
      }
    );
  }

  sendTelegramOrder(data:any): Observable<any> {
    return this.http.post(
      `https://api.telegram.org/bot${this.telegramBotToken}/sendPhoto`,
      {
        chat_id: this.ChatId,
        photo: data.img,
        caption: `ЗАКАЗ НА КОНСУЛЬТАЦИЮ
        Имя : ${data.name} 
        Контакт: ${data.contact}
        Вопрос: ${data.review}`,
      }
    )
  }
}
