import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*============  Models  =============*/
import { DataModel } from '../models/data.model';
import { QAModel } from '../models/qa.model';


/*============  RXJS  =============*/
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SharedService {


  questions?: QAModel[] = [];
  answers?: QAModel[] = []


  lastQuestion: string = '';
  correctAnswers: string[] = [];
  //In carouselComponent
  currentIndex: number = 0;
  //In timeComponent
  counterInterval: number = 20;
  userStrikes: number = 3;
  stopContinueTimer: boolean = false;

  constructor(public httpApi: HttpClient) { }

  //@Observables
  private dataSource: BehaviorSubject<QAModel[]> = new BehaviorSubject([]);
  private questionSource: BehaviorSubject<QAModel[]> = new BehaviorSubject([])
  private answersSource: BehaviorSubject<QAModel[]> = new BehaviorSubject([])

  readonly data$ = this.dataSource.asObservable();
  readonly question$ = this.questionSource.asObservable();
  readonly answers$ = this.answersSource.asObservable();

  private get api() {
    return {
      data: 'https://opentdb.com/api.php?amount=10&type=multiple'
    }
  }

  async importData() {
    this.httpApi.get(this.api.data).pipe(map((data: any) => data.results)).subscribe(async (results: DataModel[]) => {
      const reResults = results.map((res: any) =>{
        this.correctAnswers = [...this.correctAnswers, res.correct_answer];
        return {
          question: res.question.replace(/&quot;/g, "").replace(/&#039;/g, "").replace(/&atilde;/g, "").replace(/&ouml;/g, ""),
          answers: [...res.incorrect_answers, res.correct_answer.replace(/&quot;/g, "").replace(/&#039;/g, "").replace(/&atilde;/g, "").replace(/&ouml;/g, "")]
        }
      })
      this.setData = reResults
    })
  }

  set setData(data: QAModel[]) {
    this.dataSource.next(data)
  }
  get getData(){
    return this.dataSource.getValue();
  }


}
