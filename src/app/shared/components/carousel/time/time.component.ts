import {Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'timeinterval',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {

  constructor(public sharedService: SharedService) {}

  countDown() {    
    const timer = setInterval(()=> {
      --this.sharedService.counterInterval;    
      if (this.sharedService.counterInterval === 1){
        clearInterval(timer)
        this.sharedService.counterInterval = 20;
        this.countAgain();
      } 
      else if (this.sharedService.getData[this.sharedService.currentIndex].question === this.sharedService.lastQuestion){
        return clearInterval(timer)
      }
    }, 1000);
  }
  countAgain(){
    this.countDown()
  }
  ngOnInit(){
    this.countDown()
  }
}
