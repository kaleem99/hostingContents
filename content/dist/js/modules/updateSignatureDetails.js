import { getUser } from "../state/user.js";

function updateSignatureDetails2U(userObj) {
  const signature = document.querySelector("#popup-content > table");
  const name = signature.querySelector("#pfirstName");
  const lastname = signature.querySelector("#pLastName");
  const title = signature.querySelector("#pJobTitle");
  const address = signature.querySelector("#pOfficeAddress");
  const numberNode = signature.querySelector("#pOfficeNumber");
  const pronounNode = signature.querySelector("#pronoun");
  const namecoachNode = signature.querySelector("#NameCoach");
  name.innerText = getUser.pfirstName;
  lastname.innerText = " " + getUser.pLastName;
  title.innerText = getUser.pJobTitle;
  if (getUser.pOfficeAddress === "Remote") {
    address.innerText = getUser.address;
  } else {
    address.innerText = getUser.pOfficeAddress;
  }
  if (getUser.pOfficeNumber) {
    numberNode.querySelector("#pOfficeNumber").innerText =
      getUser.pOfficeNumber;
  } else {
    numberNode.remove();
  }

  if (getUser.pronoun) {
    pronounNode.querySelector("#pronoun").innerText = getUser.pronoun;
  } else {
    pronounNode.remove();
  }

  if (getUser.NameCoach) {
    namecoachNode.href = getUser.NameCoach;
    lastname.appendChild(namecoachNode);
  } else {
    namecoachNode.remove();
  }
  setTimeout(() => {
    const trElements = signature.querySelectorAll("tr");
    const tdElements = signature.querySelectorAll("td");
    const tableElements = signature.querySelectorAll("table");
    const spanElements = signature.querySelectorAll("span");
    const tBodyElements = signature.querySelectorAll("tbody");
    const pElements = signature.querySelectorAll("p");
    const imgElements = signature.querySelectorAll("img");
    const aElements = signature.querySelectorAll("a");
    const strongElements = signature.querySelectorAll("strong");

    console.log(trElements, tdElements);

    // Loop through each tr element and add the style
    trElements.forEach((tr) => {
      tr.style.outlineStyle = "none";
    });
    // Loop through each td element and add the style
    tdElements.forEach((td) => {
      td.style.outlineStyle = "none";
    });
    tableElements.forEach((table) => {
      table.style.outlineStyle = "none";
    });
    spanElements.forEach((span) => {
      span.style.outlineStyle = "none";
    });
    tBodyElements.forEach((t) => {
      t.style.outlineStyle = "none";
    });
    pElements.forEach((p) => {
      p.style.outlineStyle = "none";
    });
    imgElements.forEach((img) => {
      img.style.outlineStyle = "none";
    });
    aElements.forEach((a) => {
      a.style.outlineStyle = "none";
    });
    strongElements.forEach((strong) => {
      strong.style.outlineStyle = "none";
    });
  }, 500);
}

function updateSignatureDetailsGS(userObj) {
  const signature = document.querySelector("#popup-content > table");
  const name = signature.querySelector("#pfirstName");
  const lastname = signature.querySelector("#pLastName");
  const title = signature.querySelector("#pJobTitle");
  const number = signature.querySelector("#selectNumber");
  let customNumber = "";
  name.innerText = getUser.pfirstName;
  lastname.innerText = getUser.pLastName;
  title.innerText = getUser.pJobTitle;

  if (getUser["number-za"]) {
    customNumber = "ZA: " + getUser["number-za"];
  }
  if (getUser["number-uk"]) {
    customNumber += customNumber.length
      ? " | UK: " + getUser["number-uk"]
      : "UK: " + getUser["number-uk"];
  }
  if (getUser["number-us"]) {
    customNumber += customNumber.length
      ? " | US: " + getUser["number-us"]
      : "US: " + getUser["number-us"];
  }
  if (getUser.selectNumber === "Remote") {
    number.innerHTML = customNumber;
  } else if (getUser.selectNumber === "None" || !getUser.selectNumber) {
    number.remove();
  } else {
    number.innerHTML = getUser.selectNumber;
  }
}
function updateSignatureDetailsEdx(userObj) {
  const signature = document.querySelector("#popup-content > table");
  const name = signature.querySelector("#fname");
  const lastname = signature.querySelector("#lname");
  const title = signature.querySelector("#jobtitle");
  const address = signature.querySelector("#pOfficeAddress");
  const number = signature.querySelector("#number");
  const pronounNode = signature.querySelector("#pronoun");
  name.innerText = getUser.fname;
  lastname.innerText = getUser.lname;
  title.innerText = getUser.jobtitle;
  pronounNode.innerText = userObj.pronoun;
  number.innerText = getUser.number;
  if (pronounNode.innerText === "undefined") {
    pronounNode.innerText = "";
  }
  if (number.innerText === "undefined") {
    number.remove();
  }
  if (getUser.pOfficeAddress === "Remote") {
    address.innerText = getUser.address;
  } else if (!getUser.pOfficeAddress || getUser.pOfficeAddress === "None") {
    address.remove();
  } else {
    address.innerText = getUser.pOfficeAddress;
  }
}
export {
  updateSignatureDetails2U,
  updateSignatureDetailsGS,
  updateSignatureDetailsEdx,
};
