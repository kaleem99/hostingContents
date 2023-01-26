let quizIndex = 0;
let optionChosen = "";
let videoId = document.querySelector("iframe").src;
let isQuizComplete = "";
let countButtons = 0;
videoId = videoId.slice(0, videoId.indexOf("?"));
videoId = videoId.slice(videoId.lastIndexOf("/") + 1, videoId.length);
let countVideoButton =
  document.querySelectorAll("#section")[quizIndex].children;
for (let i = 0; i < countVideoButton.length; i++) {
  if (countVideoButton[i].className.includes("buttonQuiz")) {
    countButtons++;
  }
}
function quizComplete(arr) {
  isQuizComplete = arr;
}
function changeAnswer(option) {
  optionChosen = option;
  let elementOptions = document.getElementsByClassName("buttonQuiz option");
  let num = option[option.length - 1];
  if (quizIndex > 0) {
    num = parseInt(num) + countButtons;
  }
  for (let i = 0; i < elementOptions.length; i++) {
    elementOptions[i].style.backgroundColor = "#009cde";
  }
  elementOptions[num - 1].style.backgroundColor = "#035dae";
}
function checkAnswer() {
  let inputs = document.querySelectorAll("#section")[quizIndex].children;
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
      document.querySelectorAll("section")[quizIndex].style.display = "inline";
      document.getElementById("OverlayDiv").style.display = "block";
    }
    function play() {
      if (isQuizComplete[quizIndex] === true) {
        video.play();
        document.querySelectorAll("section")[quizIndex].style.display = "none";
        document.getElementById("OverlayDiv").style.display = "none";
        quizIndex++;
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
