import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { QAModel } from '../../models/qa.model';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  constructor(public sharedService: SharedService) { }

  dataSubscribe: Subscription;
  @Input() dataToCarousel?= [];
  @Input() dataToQuestions?= [];

  ngOnInit() {    
    this.sharedService.importData().then(() => {
      this.dataSubscribe = this.sharedService.data$.subscribe((data: QAModel[]) => {
        if (data.length) {
          this.sharedService.lastQuestion = data[data.length-1].question;                   
          data.map(d => {
            this.dataToCarousel = [...this.dataToCarousel, d.answers.sort(()=>.5 - Math.random())];
            this.dataToQuestions = [...this.dataToQuestions, d.question];
          })          
        }        
      })
    })    
  }


  ngOnDestroy(){
    this.dataSubscribe.unsubscribe()
  }

}
