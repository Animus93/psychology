import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { PreviewComponent } from './components/main-page/preview/preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './components/info/info.component';
import { FirstConsultationComponent } from './components/first-consultation/first-consultation.component';
import { PlanComponent } from './components/plan/plan.component';
import { TariffsComponent } from './components/tariffs/tariffs.component';
import { ItemComponent } from './components/tariffs/item/item.component';
import { FaqComponent } from './components/faq/faq.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { AdminFaqComponent } from './components/admin/admin-faq/admin-faq.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AdminItemsComponent } from './components/admin/admin-items/admin-items.component';
import { ItemEditFormComponent } from './components/modal/item-edit-form/item-edit-form.component';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { OrderFormComponent } from './components/modal/order-form/order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TopPanelComponent,
    NavbarComponent,
    ModalComponent,
    PreviewComponent,
    InfoComponent,
    FirstConsultationComponent,
    PlanComponent,
    TariffsComponent,
    ItemComponent,
    FaqComponent,
    CommunicationComponent,
    FooterComponent,
    AboutComponent,
    AdminComponent,
    AdminFaqComponent,
    NotificationComponent,
    AdminItemsComponent,
    ItemEditFormComponent,
    MaxLengthPipe,
    OrderFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
