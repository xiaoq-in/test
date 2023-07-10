var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answer");
var resultElement = document.getElementById("result");
var scoreElement = document.getElementById("score");
var accuracyElement = document.getElementById("accuracy");
var progressElement = document.getElementById("progress");
var nextButton = document.getElementById("nextButton");
var countdownElement = document.getElementById("countdown");

var usedQuestions = [];
var startTime;
var endTime;
var correctCount = 0;
var totalAttempts = 0;
var currentQuestionIndex = 0;
var countdownInterval;

function generateQuestion() {
  var num1, num2, operator, question, answer;

  do {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    operator = Math.random() < 0.5 ? "+" : "-";
    question = num1 + " " + operator + " " + num2;
    answer = eval(question);
  } while (usedQuestions.includes(question));

  usedQuestions.push(question);

  questionElement.textContent = question;
  answerElement.value = "";
  resultElement.textContent = "";
  answerElement.focus();

  currentQuestionIndex++;
  updateProgress();
}

function checkAnswer() {
  var userAnswer = parseInt(answerElement.value);
  var correctAnswer = eval(questionElement.textContent);
  if (userAnswer === correctAnswer) {
    resultElement.textContent = "回答正确！";
    resultElement.classList.add("text-success");
    resultElement.classList.remove("text-danger
