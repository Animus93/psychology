import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Ifaq } from 'src/app/interfaces/faq.interface';
import { FaqService } from 'src/app/services/faq.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-faq',
  templateUrl: './admin-faq.component.html',
  styleUrls: ['./admin-faq.component.css']
})
export class AdminFaqComponent {
  constructor(
    private faqService: FaqService,
    private notification: NotificationService
  ) {}
  visible = !true;
  subscriptions$: Subscription = new Subscription();
  faqSubject$: Observable<Ifaq[]> = this.faqService.faqSubject$;

  ngOnInit() {
    const getData = this.faqService.getFAQ().subscribe((data) => {
      this.faqService.faqSubject$.next(data);
    });
    this.subscriptions$.add(getData);
  }

  applyForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  editInfo(item: Ifaq) {
    if (item.question.length && item.answer.length) {
      const edit = this.faqService.putFAQItem(item).subscribe((data) => {
        this.editInfoData(data);
        this.notification.swithcVisible();
        this.notification.setData('Изменения сохранены');
      });
      this.subscriptions$.add(edit);
    }
  }
  editInfoData(data: Ifaq) {
    const prepereData: Ifaq[] = this.faqService.faqSubject$.value.map(
      (item) => {
        if (item.id == data.id) {
          (item.question = data.question), (item.answer = data.answer);
        }
        return item;
      }
    );
    this.faqService.faqSubject$.next(prepereData);
  }
  createInfo() {
    if (this.applyForm.valid) {
      const postInfoBlok = this.faqService
        .postFAQItem({
          question: this.applyForm.value.title || '',
          answer: this.applyForm.value.description || '',
        })
        .subscribe((data) => {
          const prepereData = [...this.faqService.faqSubject$.value, data];
          this.faqService.faqSubject$.next(prepereData);
          this.applyForm.reset();
          this.notification.swithcVisible();
          this.notification.setData('Запись добавлена');
        });
      this.subscriptions$.add(postInfoBlok);
    }
  }
  toggle() {
    this.visible = !this.visible;
  }
  deleteBlok(id: number | undefined) {
    if (id) {
      const removeBlok = this.faqService.deleteFAQItem(id).subscribe((data) => {
        const prepereData = this.faqService.faqSubject$.value.filter(
          (item) => item.id !== data.id
        );
        this.faqService.faqSubject$.next(prepereData);
        this.notification.swithcVisible();
        this.notification.setData('Запись удалена');
      });
      this.subscriptions$.add(removeBlok);
    }
  }
  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
