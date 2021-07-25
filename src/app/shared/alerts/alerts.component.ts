import { Component, Injectable, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'alerts',
  template: ''
})


export class AlertsComponent implements OnInit {

  private wrongAnswer = Swal.mixin({
    toast: false,
    position: 'center',
    showConfirmButton: false,
    timer: 1850
  });
  private correctAnswer = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1850,
  })


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  
  answered(answered: boolean, lastQuestion: boolean){
    if(!answered && lastQuestion){
      this.wrongAnswer.fire({
        icon: 'error',
        title: 'Wrong Answer!',
        text: `The correct answer is: ${this.sharedService.correctAnswers[this.sharedService.currentIndex]}`,
        backdrop: `
        rgba(0,0,0,.4)
        left top
        no-repeat
      `,
      })
    } else if(!answered && !lastQuestion){
      this.wrongAnswer.fire({
        icon: 'error',
        title: 'Wrong Answer!',
        text: `You have ${this.sharedService.userStrikes-1} attempts left`,
        backdrop: `
        rgba(0,0,0,.6)
        left top
        no-repeat
      `,
      })
    } else if(answered && lastQuestion || answered && !lastQuestion) {
      this.correctAnswer.fire({
        icon: 'success',
        title: 'You are correct!',
      })
    }
  };
}
