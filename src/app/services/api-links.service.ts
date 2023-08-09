import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiLinksService {
  constructor() {}

  //т.к бесплатная версия mockapi.io позволяет создать только 2 эндпоинта используется несколько разных бд
  //endpoints item(товары), data(пароль)
  DB1: string = 'https://64d38bd567b2662bf3dc67cf.mockapi.io/v1/';
}
