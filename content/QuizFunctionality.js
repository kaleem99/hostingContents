let optionChosen = "";
console.log(100);
console.log("************", 1000);
console.log(document.querySelectorAll(".buttonQuiz"));
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
    return true;
  }
  let inputs = document.querySelectorAll(".buttonQuiz");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].className.includes("correct")) {
      if (inputs[i].id === optionChosen) {
        alert("correct");
        break;
      } else {
        alert("Incorrect try again");
        break;
      }
    }
  }
}
