var numItemsElement = document.getElementById("numItems");
var operatorsElement = document.getElementById("operators");
var minValueElement = document.getElementById("minValue");
var maxValueElement = document.getElementById("maxValue");
var minResultElement = document.getElementById("minResult");
var maxResultElement = document.getElementById("maxResult");
var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answer");
var submitButton = document.getElementById("submit");
var resultElement = document.getElementById("result");
var progressElement = document.getElementById("progress");
var timerElement = document.getElementById("timer");
var statsElement = document.getElementById("stats");

var currentQuestionIndex = 1;
var totalQuestions = 0;
var correctAnswers = 0;
var startTime;
var endTime;

function generateQuestion() {
  var numItems = parseInt(numItemsElement.value);
  var operators = Array.from(operatorsElement.selectedOptions, option => option.value);
  var minValue = parseInt(minValueElement.value);
  var maxValue = parseInt(maxValueElement.value);
  var minResult = parseInt(minResultElement.value);
  var maxResult = parseInt(maxResultElement.value);

  var question = "";
  var answer = 0;

  for (var i = 0; i < numItems; i++) {
    var num = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    question += num;
    if (i < numItems - 1) {
      var operator = operators[Math.floor(Math.random() * operators.length)];
      question += " " + operator + " ";
      if (operator === "+") {
        answer += num;
      } else if (operator === "-") {
        answer -= num;
      } else if (operator === "*") {
        answer *= num;
      } else if (operator === "/") {
        answer /= num;
      }
    } else {
      answer += num;
    }
  }

  questionElement.textContent = "第 " + currentQuestionIndex + " 题：" + question;
  answerElement.value = "";
  resultElement.textContent = "";
  answerElement.focus();

  totalQuestions++;
  updateProgress();

  return answer;
}

function checkAnswer(answer) {
  var userAnswer = parseInt(answerElement.value);

  if (userAnswer === answer) {
    resultElement.textContent = "回答正确！";
    correctAnswers++;
  } else {
    resultElement.textContent = "回答错误！正确答案是：" + answer;
  }

  if (currentQuestionIndex < totalQuestions) {
    currentQuestionIndex++;
    generateQuestion();
  } else {
    submitButton.disabled = true;
    endTime = new Date();
    showStats();
  }
}

function updateProgress() {
  progressElement.textContent = "进度：" + currentQuestionIndex + " / " + totalQuestions;
}

function startTimer() {
  startTime = new Date();
  var countdown = 300; // 5 minutes in seconds

  var timer = setInterval(function() {
    var now = new Date();
    var elapsed = Math.floor((now - startTime) / 1000);
    var remaining = countdown - elapsed;

    var minutes = Math.floor(remaining / 60);
    var seconds = remaining % 60;

    if (remaining >= 0) {
      timerElement.textContent = "剩余时间：" + minutes + " 分钟 " + seconds + " 秒";
    } else {
      clearInterval(timer);
      timerElement.textContent = "时间到！";
      submitButton.disabled = true;
      endTime = now;
      showStats();
    }
  }, 1000);
}

function showStats() {
  var totalTime = Math.floor((endTime - startTime) / 1000);
  var averageTime = totalTime / totalQuestions;
  var accuracy = (correctAnswers / totalQuestions) * 100;

  statsElement.textContent = "总共答题数：" + totalQuestions +
    "，正确率：" + accuracy.toFixed(2) + "%" +
    "，平均答题时间：" + averageTime.toFixed(2) + "秒";
}

submitButton.addEventListener("click", function() {
  var answer = generateQuestion();
  checkAnswer(answer);
});

generateQuestion();
startTimer();
