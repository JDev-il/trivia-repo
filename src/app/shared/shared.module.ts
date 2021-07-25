import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from '../shared/shared-routing.module';

/*============  PrimeNg  =============*/
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';


/*============  Components  =============*/
import { QuestionsComponent } from './components/carousel/questions/questions.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { TimeComponent } from './components/time/time.component';
import { AlertsComponent } from './alerts/alerts.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    CarouselComponent,
    QuestionsComponent,
    TimeComponent,
    AlertsComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CarouselModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
