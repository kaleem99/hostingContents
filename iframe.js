let answer = "";
function changeAnswer(val) {
  console.log(val);
  answer = val;
}
function checkAnswer() {
  if (answer === "Option 3") {
    alert("Correct");
    document.querySelector("iframe").removeAttribute("srcdoc");
  } else {
    alert("incorrect");
  }
}
document.getElementById("").inn
document.getElementById("OverlayDiv").style.display = "block";