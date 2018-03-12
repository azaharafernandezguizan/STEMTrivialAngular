import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { Question } from '../models/question';

@Injectable()
export class QuestionService {

  constructor(private http: Http) { }

  getQuestions() {
    return this.http.get('../../assets/data/questions.json')
      .map(response => this.toQuestions(response.json()));
  }

  toQuestions(questions: any): Question[] {
    return questions.questionList.map((s: any) => <Question>{
      category: s.category,
      questionText: s.questionText,
      answers: s.answers,
      selectedAnswer: s.selectedAnswer,
      correctAnswerId: s.correctAnswerId
    });
  }

 getRandomQuestions(questions, totalNumberOfQuestions, amountQuestionsSelected): Question[] {
    const resultArrayQuestions = [];
    const choosedNumbers = [];
    let count = 0;

    do {
      const actualNumber = Math.floor((Math.random() * totalNumberOfQuestions));

      if (choosedNumbers.indexOf(actualNumber) === -1) {
         choosedNumbers.push(actualNumber);
         resultArrayQuestions.push(questions[actualNumber]);
         count++;
      }
    }while (count < amountQuestionsSelected);

    return resultArrayQuestions;
 }
}
