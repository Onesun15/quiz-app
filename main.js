'use strict';
/* global $*/


const STORE = {
  prompt: [{
    question: 'question0',
    answers: ['1', '2', '3','4','5'],
    correctChoice: 1
  }, {
    question: 'question1',
    answers: ['1', '2', '3','4','5'],
    correctChoice: 1
  }, {
    question: 'question2',
    answers: ['1', '2', '3','4','5'],
    correctChoice: 1
  }, {
    question: 'question3',
    answers: ['1', '2', '3','4','5'],
    correctChoice: 1
  }, {
    question: 'question4',
    answers: ['1', '2', '3','4','5'],
    correctChoice: 1
  }],
  view: 'intro',
  currentQuestion: 0,
  score: 0,
};

// Need to work on this next......
// function nextQuestion () {
//   if (STORE.currentQuestion === STORE.question.length -1) {
//     STORE.view = 'final';
//   }
//   STORE.currentQuestion++;
// }

function setView(view) {
  STORE.view = view;
  renderContent();
}

// function initQuiz() {
//   setView('intro');
// }

/********************     `HTML GENERATORS`    *******************/

function generateIntroTextHTML() {
  const introText = `<h1> <h1>Welcome to the Quiz Click below to get started</h1>
        <button class="intro-submit" type="submit">Start Quiz</button></h1>`;
  $('.intro-message').html(introText);
  return introText;
} 

function generateQuestionsHTML(question, answers) {

  const questionsText = `<form id="questionForm">
            <h2>${question}</h2>
            <p>
            <input type ="radio" name = "answer" value="0" id ="answerChoice0" role"radio">
            <label for="answerChoice1">${answers[0]}</label>
            </p>
            <p>
            <input type ="radio" name = "answer" value="1" id ="answerChoice1" role"radio">
            <label for="answerChoice2">${answers[1]}</label>
            </p>
            <p>
            <input type ="radio" name = "answer" value="2" id ="answerChoice2" role"radio">
            <label for="answerChoice3">${answers[2]}</label>
            </p>
            <p>
            <input type ="radio" name = "answer" value="3" id ="answerChoice3" role"radio">
            <label for="answerChoice4">${answers[3]}</label>
            </p>
            <p>
            <input type ="radio" name = "answer" value="4" id ="answerChoice4" role"radio">
            <label for="answerChoice5">${answers[4]}</label>
            </p>
            <button class="feedback-submit" type="submit">Submit</button>
        </form> `;

  $('.question-page').html(questionsText);
  return questionsText;
}

function generateQuestionString() {
  const count = STORE.currentQuestion;
  const question = STORE.prompt[count]['question'];
  const answers = STORE.prompt[count]['answers'];
  generateQuestionsHTML(question, answers);
  STORE.currentQuestion++;
  return question; 
} 

function generateFeedbackHTML() {
  const feedbackText = ` <div class="right">You got it right</div>
        <div class="wrong">You got it wrong</div>
        <button class="continue-submit">Continue</button>`;
  $('.feedback').html(feedbackText);
}

function generateFinalHTML() {
  const finalText = ` <h1>Thank you for playing</h1>
        <div class="score">You scored this out of that</div>
        <button class="play-again-submit">Play Again?</button>`;
  $('.final').html(finalText);
}

/********************     `CHECK VEIW STATE`    *******************/

function renderContent() {
  if (STORE.view === 'intro') {
    $('.intro-message').show();
    $('.final').hide();
    generateIntroTextHTML();
  }
  else if(STORE.view === 'questions') {
    // serve the question and answers html form "questionForm"
    $('.intro-message').hide();
    generateQuestionString();
    //generateQuestionsHTML();
  }
  else if(STORE.view === 'feedback') {
    // serve the feedback html
    $('.question-page').hide();
    generateFeedbackHTML();
  }
  else if(STORE.view === 'final') {
    // serve the feedback html
    $('.feedback').hide();
    $('.final').show();
    generateFinalHTML();
  }
}

/********************     `EVENT HANDLERS`    *******************/

function handleStartSubmit() {
  $('.intro-message').on('click', '.intro-submit',(event) => {
    event.preventDefault();
    // console.log(event);
    // STORE.view = 'questions';
    setView('questions');
  });
}

function handleFeedbackSubmit() {
  $('.question-page').on('click', '.feedback-submit',(event) => {
    event.preventDefault();
    //console.log(event);
    setView('feedback');
  });
}

function handleFinalPageView() {
  $('.feedback').on('click', '.continue-submit',(event) => {
    event.preventDefault();
    //console.log(event);
    setView('final');
  });
}

function handleResetQuiz() {
  $('.final').on('click', '.play-again-submit',(event) => {
    event.preventDefault();
    //console.log(event);
    setView('intro');
  });
}

/********************     FUNCTION CALLS     *******************/

// On DOM Ready:

$(() => {
  renderContent();
  handleStartSubmit();
  handleFeedbackSubmit();
  handleFinalPageView();
  handleResetQuiz();
});


/********************     INSTRUCTOR STUBS    *******************/

// // Constants for permanent DOM identifiers
// const QUESTION_TEXT_EL = $('.question-text');
// const ANSWER_LIST_EL = $('.answers-list');
// const USER_CONTROLS = $('.user-controls');

// // Generate Templates
// function generateAnswerList(answers) {

// }

// // Rendering
// function renderQuestionText() {

// }

// // Event handlers
// function handleAnswerSubmitted() {
//   USER_CONTROLS.on('click', '.submit-answer', () => {
//     // Retrieve answer identity of currently checked radio button
//     // Check answer against correct answer of current question
//     // Update STORE and render appropriate section
//   });
// }



/********************     TEST CODE IDEAS  ********************  

// function getQuestions(data) {
//   let questionsArray = [];
//   data.map(k => {
//     for (let key in k) {
//       if (key === 'question') {
//         questionsArray.push(k[key]);
//       }
//     }
//   });
//   return questionsArray;
// }

  //console.log(question);
 //console.log(answer);
  // const question = STORE.prompt.map((q, index) => {
    //console.log(cQ, index);
  //   if (cQ === index){
  //     for (let key in q) {
  //       console.log('here', q[key]);
  //       //generateQuestionsHTML(q[key]);
  //     }
  //   }
  // });
  // if (STORE.currentQuestion === STORE.prompt[0]){
  //console.log(question.join(''));

*/