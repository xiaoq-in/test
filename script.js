var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answer");
var resultElement = document.getElementById("result");

var usedQuestions = [];

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
}

function checkAnswer() {
  var userAnswer = parseInt(answerElement.value);
  var correctAnswer = eval(questionElement.textContent);
  if (userAnswer === correctAnswer) {
    resultElement.textContent = "回答正确！";
    resultElement.classList.add("text-success");
    resultElement.classList.remove("text-danger");
  } else {
    resultElement.textContent = "回答错误，正确答案是 " + correctAnswer;
    resultElement.classList.add("text-danger");
    resultElement.classList.remove("text-success");
  }
  generateQuestion();
}

answerElement.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkAnswer();
  }
});

generateQuestion();
