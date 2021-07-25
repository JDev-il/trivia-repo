import { AnswersModel } from "./answer.model";
import { DataModel } from "./data.model";

export class QAModel {
    question?: string;
    answers?: string[];

    constructor(qa?: QAModel){
        if(qa){
            this.question = qa.question;
            this.answers = qa.answers;
        }
    }

}