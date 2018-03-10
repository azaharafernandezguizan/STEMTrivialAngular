import { QuestionService } from './services/question.service';
import { Component, Input } from '@angular/core';
import {  FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialMessage = '';
  isWelcomeVisible = false;
  isGameVisible = true;
  isResultVisible = true;
  questions = [];
  currentQuestion = null;
  indexCurrentQuestion = 0;
  currentAnswers = [];
  @Input() valueSelected = '';
  result = { category: '', explanation: '', points: 0, urlImage: '' };

  constructor(private questionService: QuestionService) {
    this.changeVisibility('Welcome');
    this.initialMessage = 'Bienvenido a STEM Trivial!' +
      '¿Dispuesto a conocer tu nivel de conocimiento sobre las mujeres en las STEM?';
  }

  startGame() {
    this.questionService.getQuestions().subscribe(stad => {
        this.questions = stad;
        this.initGame();
      }, error => alert('Sorry, data not found!!!'));
  }

  initGame() {
    this.questions =  this.questionService.getRandomQuestions(this.questions, 16, 8);
    this.changeVisibility('Game');
    if (this.questions != null && this.questions.length !== 0) {
      this.currentQuestion = this.questions[0];
      this.currentAnswers = this.currentQuestion.answers;
      this.indexCurrentQuestion = 0;
    }
  }

  nextQuestion() {
    this.indexCurrentQuestion++;
    if (this.valueSelected === this.currentQuestion.correctAnswerId) {
      this.result.points++;
    }

    this.valueSelected = '';

    if (this.questions.length > this.indexCurrentQuestion) {
      this.currentQuestion = this.questions[this.indexCurrentQuestion];
      this.currentAnswers = this.currentQuestion.answers;
    } else {
      this.changeVisibility('Result');
      this.fillResultText();
    }
  }

  changeVisibility(type) {
    switch (type) {
      case 'Welcome':
        this.isWelcomeVisible = false;
        this.isGameVisible = true;
        this.isResultVisible = true;
        break;
      case 'Game':
        this.isWelcomeVisible = true;
        this.isGameVisible = false;
        this.isResultVisible = true;
        break;
      case 'Result':
        this.isResultVisible = false;
        this.isGameVisible = true;
        this.isWelcomeVisible = true;
        break;
    }
  }

  fillResultText() {
    const questionsCount = this.questions.length;

    if (this.result.points >= (questionsCount * 0.9)) {
      this.result.category = 'Gold';
      this.result.explanation = 'Has acertado ' + this.result.points + ', medalla de oro, enhorabuena!';
      this.result.urlImage = '/assets/images/oro.jpg';
    } else if (this.result.points >= (questionsCount * 0.7)) {
      this.result.category = 'Silver';
      this.result.explanation = 'Has acertado ' + this.result.points + ', medalla de plata!';
      this.result.urlImage = '/assets/images/plata.jpg';
    } else if (this.result.points >= (questionsCount * 0.5)) {
      this.result.category = 'Bronce';
      this.result.explanation = 'Has acertado ' + this.result.points + ', medalla de bronce!';
      this.result.urlImage = '/assets/images/bronce.jpg';
    } else {
      this.result.category = 'No ha habido suerte';
      this.result.explanation = 'Prueba suerte la próxima vez!';
      this.result.urlImage = '/assets/images/loser.png';
    }
  }

  playAgain() {
    this.currentQuestion = null;
    this.indexCurrentQuestion = 0;
    this.result = { category: '', explanation: '', points: 0, urlImage: '' };
    this.startGame();
  }

}
