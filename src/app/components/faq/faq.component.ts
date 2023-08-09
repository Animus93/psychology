import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Ifaq } from 'src/app/interfaces/faq.interface';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  constructor(private faq: FaqService) {}
  faqBlok$: Observable<Ifaq[]> = this.faq.getFAQ();
}
