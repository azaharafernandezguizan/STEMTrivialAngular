import { Answer } from '../models/answers';

export class Question {
    category: string;
    questionText: string;
    answers: Answer[];
    selectedAnswer: string;
    correctAnswerId: string;

    constructor(category: string, questionText: string, answers: Answer[], selectedAnswer: string,
        correctAnswerId: string) {
        this.category = category;
        this.questionText = questionText;
        this.answers = answers;
        this.selectedAnswer = selectedAnswer;
        this.correctAnswerId = correctAnswerId;
    }
}
