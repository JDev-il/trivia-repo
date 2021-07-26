import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() stopWatch = new EventEmitter();
  @Input() answers?: QAModel[] = [];
  @Input() questions?: QAModel[] = [];



  disableNext: boolean = true;
  answerStr: string = '';

  constructor(public sharedService: SharedService, public alerts: AlertsComponent) { }

  ngOnInit() {
    const next = setInterval(() => {
      if (this.sharedService.currentIndex === 10){      
        this.disableNext = true;
      } else {
        this.sharedService.currentIndex++;
      }
        this.sharedService.userStrikes = 3;
        this.sharedService.counterInterval = 20;    
    }, 20000);
  
  }

  nextQuestion() { // onClick event
    if (this.sharedService.currentIndex === 9) {
      this.disableNext = true;
    }
    this.disableNext = true;
    this.sharedService.userStrikes = 3;
    this.sharedService.counterInterval = 20    
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
      return;
      //^ Correct & Not Last; 
    } 
    
    else if (!isAnswered && isNotlast) {
      this.alerts.answered(false, false);
      //! NOT Correct & Not Last;  
    }
    
    else if (isAnswered && isLast) {
      this.alerts.answered(true, true)
      this.disableNext = false;
      //^ Correct & Last
    } 
    
    else if (!isAnswered && isLast) {
      this.alerts.answered(false, true)
      setTimeout(() => {
        this.sharedService.userStrikes = 3
        this.sharedService.counterInterval = 20;    
        this.sharedService.currentIndex++;
        return 
      }, 1800);
      //! NOT Correct & Last;
    } 
    this.sharedService.userStrikes--
  }

}