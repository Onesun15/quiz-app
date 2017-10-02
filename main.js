'use strict';
/* global $*/

// Create your initial store
const STORE = {
  // Questions (with answers)
  prompt: [{
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
  }, {
    question: 'question5',
    answers: ['1', '2', '3','4','5'],
    correctChoice: 1
  }],
  // User's answer choice(s)
  //what is the current view?
  view: 'questions',
  // What is the current question?
  currentQuestion: 0,
  // Score? Anything else?
  score: 0
};

function nextQuestion () {
  if (STORE.currentQuestion === STORE.question.length -1) {
    STORE.view = 'outro';
  }
  STORE.currentQuestion++;
}

function generateIntroTextHTML() {
  const introText = `<h1> <h1>Welcome to the Quiz Click below to get started</h1>
        <button class="intro-submit" type="submit">Start Quiz</button></h1>`;
  $('.intro-message').html(introText);
  return introText;
} 

function handleStartSubmit() {
  $('.intro-message').on('click', '.intro-submit',(event) => {
    event.preventDefault();
    // console.log(event);
    STORE.view = 'questions';
    renderContent();
  });
}

function handleFeedbackSubmit() {
  $('.question-page').on('click', '.feedback-submit',(event) => {
    event.preventDefault();
    //console.log(event);
    STORE.view = 'feedback';
    renderContent();
  });
}

function handleFinalPageView() {
  $('.feedback').on('click', '.continue-submit',(event) => {
    event.preventDefault();
    //console.log(event);
    STORE.view = 'final';
    renderContent();
  });
}

function handleResetQuiz() {
  $('.final').on('click', '.play-again-submit',(event) => {
    event.preventDefault();
    //console.log(event);
    STORE.view = 'intro';
    renderContent();
  });
}

// Make this dynamcially change to each questions content
function generateQuestionsHTML(q, index) {
console.log('here', q, index);
  const questionsText = `<form id="questionForm">
            <h2>Question</h2>
            <p>
            <input type ="radio" name = "answer" id ="answerChoice1">
            <label for="answerChoice1">Answer</label>
            </p>
            <p>
            <input type ="radio" name = "answer" id ="answerChoice2">
            <label for="answerChoice2">Answer</label>
            </p>
            <p>
            <input type ="radio" name = "answer" id ="answerChoice3">
            <label for="answerChoice3">Answer</label>
            </p>
            <p>
            <input type ="radio" name = "answer" id ="answerChoice4">
            <label for="answerChoice4">Answer</label>
            </p>
            <p>
            <input type ="radio" name = "answer" id ="answerChoice5">
            <label for="answerChoice5">Answer</label>
            </p>
            <button class="feedback-submit" type="submit">Submit</button>
        </form> `;
  $('.question-page').html(questionsText);
  return questionsText;
}

function getQuestions(data) {
  let questionsArray = [];
  data.map(k => {
    for (let key in k) {
      if (key === 'question') {
        questionsArray.push(k[key]);
      }
    }
  });
  return questionsArray;
}

function generateQuestionString(questions) {
  
  const question = getQuestions(STORE.prompt).map((q, index) => generateQuestionsHTML(q, index));

  return question.join('');
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

// Render content an update STORE.view state
function renderContent(){
  if (STORE.view === 'intro') {
    $('.intro-message').show();
    $('.final').hide();
    generateIntroTextHTML();
  }
  else if(STORE.view === 'questions') {
    // serve the question and answers html form "questionForm"
    $('.intro-message').hide();
    generateQuestionString();
    generateQuestionsHTML();
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

// Constants for permanent DOM identifiers
const QUESTION_TEXT_EL = $('.question-text');
const ANSWER_LIST_EL = $('.answers-list');
const USER_CONTROLS = $('.user-controls');

// Generate Templates
function generateAnswerList(answers) {

}

// Rendering
function renderQuestionText() {

}

// Event handlers
function handleAnswerSubmitted() {
  USER_CONTROLS.on('click', '.submit-answer', () => {
    // Retrieve answer identity of currently checked radio button
    // Check answer against correct answer of current question
    // Update STORE and render appropriate section
  });
}

// On DOM Ready:
$(() => {
  handleAnswerSubmitted();
  handleStartSubmit();
  handleFeedbackSubmit();
  handleFinalPageView();
  handleResetQuiz();
});

renderContent();