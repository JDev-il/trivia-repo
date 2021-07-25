import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { numberOfQuestions } from '../questions.actions';
// import { increment, decrement, reset } from '../store/questions.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class MyCounterComponent {
  count$: Observable<number>
 
  constructor(private store: Store<{ addQuestion: number}>) {
    this.count$ = store.select('addQuestion');
    // TODO: Connect `this.count$` stream to the current store `count` state
  }
 
  numberOfQuestion() {
    this.store.dispatch(numberOfQuestions());
    // TODO: Dispatch an increment action
  }
}