import { Component, Input} from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialMessage = "";
  isWelcomeVisible = false;
  isGameVisible = true;
  isResultVisible = true;
  questions = [];
  currentQuestion = null;
  indexCurrentQuestion = 0;
  currentAnswers= [];
  @Input() valueSelected :string  ="";
  result = { category: "", explanation: "", points: 0, urlImage: "" };

  constructor(){
    this.changeVisibility("Welcome");
    this.initialMessage = 'Bienvenido a STEM Trivial!' +
      '¿Dispuesto a conocer tu nivel de conocimiento sobre las mujeres en las STEM?';
  }

  startGame() {
    /**this.questionService.getQuestions(this, function (objectApp) {
      objectApp.initGame(objectApp.questions);
    });*/
    this.questions=[
      {
        "category": "Ciencias",
        "text": "¿Quién descubrió la estructura del DNA?",
        "answers": [
            {
                "id": "0",
                "text": "Rosalind Franklin"
            },
            {
                "id": "1",
                "text": "Marie Curie"
            },
            {
                "id": "2",
                "text": "Rita Levi Montalcini"
            }
        ],
        "selectedAnswer": "null",
        "correctAnswerId": "0"
    },
    {
        "category": "Tecnología",
        "text": "¿Quién es la CEO de Facebook Iberia en 2018?",
        "answers": [
            {
                "id": "0",
                "text": "Marta Ríos"
            },
            {
                "id": "1",
                "text": "Irene Cano"
            },
            {
                "id": "2",
                "text": "Arancha Torres"
            }
        ],
        "selectedAnswer": "null",
        "correctAnswerId": "1"
    },
    {
        "category": "Matemáticas",
        "text": "¿Quien fue la primera mujer en ocupar una cátedra de matemáticas?",
        "answers": [
            {
                "id": "0",
                "text": "María G. Agnesi"
            },
            {
                "id": "1",
                "text": "Hipatía de Alejandría"
            },
            {
                "id": "2",
                "text": "Sophie Germain"
            }
        ],
        "selectedAnswer": "null",
        "correctAnswerId": "2"
    },
    {
        "category": "Ingeniería",
        "text": "¿Quien fue la primera mujer diplomada como Ingeniera en América del Sur?",
        "answers": [
            {
                "id": "0",
                "text": "Carmen de Andrés"
            },
            {
                "id": "1",
                "text": "Pino Pliego"
            },
            {
                "id": "2",
                "text": "Elisa Bachofen"
            }
        ],
        "selectedAnswer": "null",
        "correctAnswerId": "2"
    }
    ];

    this.initGame(this.questions);
  }

  initGame(questions) {
    //this.questions =  this.questionService.getRandomQuestions(questions.questionList, 16, 8);
    this.changeVisibility("Game");
    if (this.questions != null && this.questions.length != 0) {
      this.currentQuestion = this.questions[0];
      this.currentAnswers = this.currentQuestion.answers;
      this.indexCurrentQuestion = 0;
    }
  }

  nextQuestion() {
    this.indexCurrentQuestion++;
    if (this.valueSelected == this.currentQuestion.correctAnswerId) {
      this.result.points++;
    }

    if (this.questions.length > this.indexCurrentQuestion) {
      this.currentQuestion = this.questions[this.indexCurrentQuestion];
      this.currentAnswers = this.currentQuestion.answers;
    }
    else {
      this.changeVisibility("Result");
      this.fillResultText();
    }
  }

  changeVisibility(type) {
    switch (type) {
      case "Welcome":
        this.isWelcomeVisible = false;
        this.isGameVisible = true;
        this.isResultVisible = true;
        break;
      case "Game":
        this.isWelcomeVisible = true;
        this.isGameVisible = false;
        this.isResultVisible = true;
        break;
      case "Result":
        this.isResultVisible = false;
        this.isGameVisible = true;
        this.isWelcomeVisible = true;
        break;
    }
  }

  fillResultText() {
    var questionsCount = this.questions.length;

    if (this.result.points >= (questionsCount * 0.9)) {
      this.result.category = "Gold";
      this.result.explanation = "Has acertado " + this.result.points + ", medalla de oro, enhorabuena!";
      this.result.urlImage = "/assets/images/oro.jpg";
    } else if (this.result.points >= (questionsCount * 0.7)) {
      this.result.category = "Silver";
      this.result.explanation = "Has acertado " + this.result.points + ", medalla de plata!";
      this.result.urlImage = "/assets/images/plata.jpg";
    } else if (this.result.points >= (questionsCount * 0.5)) {
      this.result.category = "Bronce";
      this.result.explanation = "Has acertado " + this.result.points + ", medalla de bronce!";
      this.result.urlImage = "/assets/images/bronce.jpg";
    } else {
      this.result.category = "No ha habido suerte";
      this.result.explanation = "Prueba suerte la próxima vez!";
      this.result.urlImage = "/assets/images/loser.png";
    }
  }

  playAgain(){
    this.currentQuestion = null;
    this.indexCurrentQuestion = 0;
    this.result = { category: "", explanation: "", points: 0,urlImage: "" };
    this.startGame();
  }

}
