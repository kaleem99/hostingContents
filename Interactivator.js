let quizIndex = 0;
let optionChosen = "";
let videoId = document.querySelector("iframe").src;
let isQuizComplete = "";
let countButtons = 0;
let ArrayOfQuestions = [];
let idElementName = "OverlayDiv";
videoId = videoId.slice(0, videoId.indexOf("?"));
videoId = videoId.slice(videoId.lastIndexOf("/") + 1, videoId.length);
document.querySelector("iframe").allowFullscreen = false;
function quizComplete(arr, QuestionsArr) {
  console.log(arr, QuestionsArr);
  isQuizComplete = arr;
  if (QuestionsArr !== undefined) {
    ArrayOfQuestions = QuestionsArr;
  }
  console.log("******** Working ************");
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
function checkAnswer(type) {
  if (type) {
    idElementName = "OverlayDivVideoInteractive";
    isQuizComplete[quizIndex] = true;
    return true;
  }
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
    console.log(video);
    console.log(videoId);
    function stop() {
      video.pause();
      console.log(200, 200)
      if (ArrayOfQuestions.length > 0) {
        console.log(111);
        generateQuestionsAndOptions();
      }
      document.getElementById("section").style.display = "inline";
      document.getElementById(idElementName).style.display = "block";
    }
    function play() {
      if (isQuizComplete[quizIndex] === true) {
        video.play();
        document.getElementById("section").style.display = "none";
        document.getElementById(idElementName).style.display = "none";
        quizIndex++;
        let divInputs = document.getElementById("InputSection");
        divInputs.innerHTML = "";
      }
    }
    video.bind("play", function () {
      console.log("vide playing.")
      document.getElementById("section").style.display = "none";
    });
    video.bind("secondchange", function () {
      if (Math.floor(video.time()) === isQuizComplete[quizIndex]) {
        stop();
      }
    });
    window.setInterval(play, 1000);
  },
});
