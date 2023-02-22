let iframeSrcArr = document.querySelector("iframe").src.toString().split(";");
  console.log(iframeSrcArr);
  let funcArr = [];
  let timeArr = [];
  let optionsObj = {};
  let OptionsArr = [];
  function Add_Quiz(...args) {
    let newArgs = args.filter((data) => data !== "" && data);
    timeStop = parseInt(newArgs[0]);
    optionQuestions = newArgs.slice(2, newArgs.length - 1);
    correctOption = newArgs.pop();
    correctOption = correctOption.split(" ").pop();
    inputQuestion = optionQuestions.shift();
    console.log(optionQuestions, inputQuestion);
    correctOption = optionQuestions[correctOption - 1];
    console.log(correctOption);
    timeArr.push(parseInt(timeStop));
    optionsObj.Question = inputQuestion;
    optionsObj.correct = correctOption;

    for (let i = 0; i < optionQuestions.length; i++) {
      optionsObj["Option" + (i + 1)] = optionQuestions[i];
    }
    OptionsArr.push(optionsObj);
  }
  for (let i = 0; i < iframeSrcArr.length; i++) {
    if (
      iframeSrcArr[i][0] === "A" &&
      iframeSrcArr[i][1] === "d" &&
      iframeSrcArr[i][2] === "d"
    ) {
      eval(iframeSrcArr[i].replace(/%22/gi, "'").replace(/%20/gi, " "));
      iframeSrcArr[i] = "";
    }
  }
  document.querySelector("iframe").src = iframeSrcArr.join(";");
  console.log("*".repeat(10));
  console.log(timeArr);
  console.log(OptionsArr);
  quizComplete(timeArr, OptionsArr);
