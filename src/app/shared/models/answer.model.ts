export class AnswersModel {
    correct_answer?: [];
    incorrect_answers?: [];
    
    constructor(answers?: AnswersModel) {
        if (answers) {
            this.correct_answer = answers.correct_answer;
            this.incorrect_answers = answers.incorrect_answers;
        }
    }
}