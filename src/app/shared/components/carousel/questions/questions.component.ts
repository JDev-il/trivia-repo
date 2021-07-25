import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  readyForQuestions?: boolean;
  questionsSubscribe: Subscription; 

  @Input() questions: string[];
 
  constructor(public sharedService: SharedService) { }

  ngOnInit() {
  }

}
