import { AnswersModel } from "./answer.model";

export class DataModel {
    category?: string;
    question?: string;
    difficulty?: string;
    correct_answer?: string;
    incorrect_answers?: AnswersModel[];
    type?: string;

    constructor(data?: DataModel){
        if(data){
            this.category = data.category;
            this.correct_answer = data.correct_answer;
            this.difficulty = data.difficulty;
            this.incorrect_answers = data.incorrect_answers;
            this.question = data.question;
            this.type = data.type;
        }
    }

}