const result = [];
const correct = [];
let resultVariable = "";

$(document).ready(function () {
  let initialConvenienceTop = $("#Convenience-Move").css("top");
  let initialConvenienceLeft = $("#Convenience-Move").css("left");

  let initialPurposeTop = $("#Purpose-Move").css("top");
  let initialPurposeLeft = $("#Purpose-Move").css("left");

  let initialQuotaTop = $("#Quota-Move").css("top");
  let initialQuotaLeft = $("#Quota-Move").css("left");

  let initialSnowballTop = $("#Snowball-Move").css("top");
  let initialSnowballLeft = $("#Snowball-Move").css("left");

  let dotIn = false;

  let MovingElement = "";
  let correctVariable = "";
  const topData = [
    initialConvenienceTop,
    initialPurposeTop,
    initialQuotaTop,
    initialSnowballTop,
  ];
  const leftData = [
    initialConvenienceLeft,
    initialPurposeLeft,
    initialQuotaLeft,
    initialSnowballLeft,
  ];
  const test = [
    "#Convenience-Move",
    "#Purpose-Move",
    "#Quota-Move",
    "#Snowball-Move",
  ];
  const dropComp = (element, ui, dotIn) => {
    $("#" + ui.draggable[0].id).css(
      "top",
      $("#" + $(element).attr("id")).css("top")
    );
    $("#" + ui.draggable[0].id).css(
      "left",
      $("#" + $(element).attr("id")).css("left")
    );
    resultVariable = ui.draggable[0].id.split("-")[0];
    correctVariable = $(element).attr("id");
    setTimeout(() => {
      if (result.length === 4) {
        let filteredResult = result.filter(
          (data, i) => data === correct[i] && data
        );
        if (filteredResult.length === 4) {
          alert("Correct");
        } else {
          alert("Incorrect");
          result.length = 0;
          correct.length = 0;

          for (let i = 0; i < test.length; i++) {
            $(test[i]).css("top", topData[i]);
          }
        }
      }

      dotIn = false;
    }, 1000);
  };

  // 	Draggable Convenience
  for (let i = 0; i < test.length; i++) {
    $(test[i]).draggable({
      start: function () {
        // The element is starting to be dragged
        console.log("Element is being dragged...", MovingElement);
      },
      stop: function () {
        // The dragging of the element has stopped
        console.log("Element dragging stopped.");
        if (!dotIn) {
          $(test[i]).css("left", leftData[i]);
          $(test[i]).css("top", topData[i]);
        } else {
          $(test[i]).css("top", $(MovingElement).css("top"));
          $(test[i]).css("left", $(MovingElement).css("left"));
          result.push(resultVariable);
          correct.push(correctVariable);
        }
      },
    });
  }

  // Droppable
  for (let i = 0; i < test.length; i++) {
    $(test[i].split("-")[0]).droppable({
      accept:
        "#Convenience-Move, #Purpose-Move, #Quota-Move, #Snowball-Move",
      tolerance: "touch",
      greedy: true,
      over: function (event, ui) {
        dotIn = true;
        // MovingElement = "#Convenience";
        // MovingElement = "#" + $(this).attr("id");
      },
      out: function (event, ui) {
        dotIn = false;
      },
      drop: function (event, ui) {
        dropComp(this, ui, dotIn);
      },
    });
  }
});
