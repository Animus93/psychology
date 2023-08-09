import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiLinksService } from './api-links.service';
import { Ifaq } from '../interfaces/faq.interface';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient, private apiLinks: ApiLinksService) {}

  faqSubject$ = new BehaviorSubject<Ifaq[]>([]);

  getFAQ(): Observable<Ifaq[]> {
    return this.http.get<Ifaq[]>(`${this.apiLinks.DB1}/faq`);
  }

  postFAQItem(blok: Ifaq): Observable<Ifaq> {
    return this.http.post<Ifaq>(`${this.apiLinks.DB1}/faq`, {
      ...blok,
    });
  }
  deleteFAQItem(id: Number): Observable<Ifaq> {
    return this.http.delete<Ifaq>(`${this.apiLinks.DB1}/faq/${id}`);
  }

  putFAQItem(data: Ifaq): Observable<Ifaq> {
    return this.http.put<Ifaq>(`${this.apiLinks.DB1}/faq/${data.id}`,{
      ...data
    });
  }
}
