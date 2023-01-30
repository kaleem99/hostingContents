let quizIndex = 0;
let optionChosen = "";
let videoId = document.querySelector("iframe").src;
let isQuizComplete = "";
let countButtons = 0;
let ArrayOfQuestions = [];
videoId = videoId.slice(0, videoId.indexOf("?"));
videoId = videoId.slice(videoId.lastIndexOf("/") + 1, videoId.length);

function quizComplete(arr, QuestionsArr) {
  isQuizComplete = arr;
  ArrayOfQuestions = QuestionsArr;
}
function generateQuestionsAndOptions() {
  let question = document.getElementById("Question");
  question.innerHTML = ArrayOfQuestions[quizIndex].Question;
  let QuestionsfromArr = Object.keys(ArrayOfQuestions[quizIndex]).length;
  let divInputs = document.getElementById("InputSection");
  for (let i = 0; i < QuestionsfromArr - 2; i++) {
    divInputs.innerHTML += ` <button class="buttonQuiz option ${
      ArrayOfQuestions[quizIndex]["Option" + (i + 1)] ===
      ArrayOfQuestions[quizIndex].correct
        ? "correct"
        : ""
    }" id='Option ${i + 1}' onclick="changeAnswer(\`Option ${
      i + 1
    }\`)" tabindex="0"> ${
      ArrayOfQuestions[quizIndex]["Option" + (i + 1)]
    }</button><br /><br />`;
  }
}

function changeAnswer(option) {
  console.log(option);
  optionChosen = option;
  let elementOptions = document.getElementsByClassName("buttonQuiz option");
  let num = option[option.length - 1];
  for (let i = 0; i < elementOptions.length; i++) {
    elementOptions[i].style.backgroundColor = "#009cde";
  }
  elementOptions[num - 1].style.backgroundColor = "#035dae";
}
function checkAnswer() {
  let inputs = document.getElementById("InputSection").children;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].className.includes("correct")) {
      if (inputs[i].id === optionChosen) {
        alert("correct");
        isQuizComplete[quizIndex] = true;
        break;
      } else {
        alert("Incorrect try again");
        break;
      }
    }
  }
}
window._wq = window._wq || [];
_wq.push({
  id: videoId,
  onReady: function (video) {
    function stop() {
      video.pause();
      generateQuestionsAndOptions();
      document.getElementById("section").style.display = "inline";
      document.getElementById("OverlayDiv").style.display = "block";
    }
    function play() {
      if (isQuizComplete[quizIndex] === true) {
        video.play();
        document.getElementById("section").style.display = "none";
        document.getElementById("OverlayDiv").style.display = "none";
        quizIndex++;
        let divInputs = document.getElementById("InputSection");
        divInputs.innerHTML = "";
      }
    }
    video.bind("secondchange", function () {
      console.log(isQuizComplete[quizIndex]);
      if (Math.floor(video.time()) === isQuizComplete[quizIndex]) {
        stop();
      }
    });
    window.setInterval(play, 1000);
  },
});
