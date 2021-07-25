import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { QAModel } from '../../models/qa.model';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { AlertsComponent } from '../../alerts/alerts.component'

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],

})
export class CarouselComponent implements OnInit {

  questionsReady?: boolean;
  carouselSubscribe: Subscription;

  @Input() answers?: QAModel[] = [];
  @Input() questions?: QAModel[] = [];

  disableNext: boolean = true;
  answerStr: string = '';

  constructor(public sharedService: SharedService, public alerts: AlertsComponent) { }

  ngOnInit() {
  }


  setCarouselIndex() {
   
  }

  nextQuestion() {
    if (this.sharedService.currentIndex === 9) {
      this.disableNext = true;

    }
    this.disableNext = true
    this.sharedService.currentIndex++;
  }


  async answerClicked(answer: any) {
    const
      isAnswered = this.sharedService.correctAnswers[this.sharedService.currentIndex] === answer,
      isNotlast = this.sharedService.userStrikes > 1,
      isLast = this.sharedService.userStrikes === 1;

    if (isAnswered && isNotlast) {
      this.alerts.answered(true, false)
      this.disableNext = false;
      this.sharedService.userStrikes = 3;
      this.sharedService.counterInterval = 20; 
      return;
      // Correct & isNotLast; 
    } 
    
    else if (!isAnswered && isNotlast) {
      this.alerts.answered(false, false);
      // NOT Correct & isNotLast;  
    }
    
    else if (isAnswered && isLast) {
      this.alerts.answered(true, true)
      this.disableNext = false;
      this.sharedService.userStrikes = 3;
      this.sharedService.counterInterval = 20       
      // Correct & isLast
    } 
    
    else if (!isAnswered && isLast) {
      this.alerts.answered(false, true)
      setTimeout(() => {
        this.sharedService.userStrikes = 3
        this.sharedService.counterInterval = 20;    
        return this.sharedService.currentIndex++;
      }, 2500);

      // NOT Correct & isLast;
    
    } 
    --this.sharedService.userStrikes
  }

}