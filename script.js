var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answer");
var resultElement = document.getElementById("result");
var scoreElement = document.getElementById("score");
var accuracyElement = document.getElementById("accuracy");

var usedQuestions = [];
var startTime;
var endTime;
var correctCount = 0;
var totalAttempts = 0;

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
    correctCount++;
  } else {
    resultElement.textContent = "回答错误，正确答案是 " + correctAnswer;
    resultElement.classList.add("text-danger");
    resultElement.classList.remove("text-success");
  }
  totalAttempts++;
  updateScore();
  generateQuestion();
}

function updateScore() {
  var currentTime = new Date().getTime();
  var elapsedTime = Math.floor((currentTime - startTime) / 1000); // 转换为秒
  var accuracy = (correctCount / totalAttempts) * 100;

  scoreElement.textContent = correctCount + "/" + totalAttempts;
  accuracyElement.textContent = accuracy.toFixed(2) + "%";

  if (elapsedTime >= 300) {
    // 达到5分钟，停止测试
    answerElement.disabled = true;
    resultElement.textContent = "时间到！测试结束。";
  }
}

answerElement.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkAnswer();
  }
});

function startTest() {
  startTime = new Date().getTime();
  generateQuestion();
  answerElement.disabled = false;
  answerElement.focus();
}

startTest();
