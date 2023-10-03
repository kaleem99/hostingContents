import { togglePopupLoader } from "./utils.js";
import { getUser } from "../state/user.js";
import {
  updateSignatureDetails2U,
  updateSignatureDetailsEdx,
  updateSignatureDetailsGS,
} from "./updateSignatureDetails.js";

function mountSignature(signature) {
  const popupContentDiv = document.querySelector("#popup-content");
  popupContentDiv.innerHTML = "";
  togglePopupLoader("show");
  if (getUser.salesforce) {
    signature += "-sf";
  }
  fetch(`./dist/files/signature-${signature}.html`)
    .then((resp) => resp.text())
    .then((data) => {
      popupContentDiv.innerHTML = data;
      togglePopupLoader("hide");
      if (getUser.signature === "2u") {
        updateSignatureDetails2U(getUser);
        console.log(10000);
      } else if (getUser.signature === "gs") {
        updateSignatureDetailsGS(getUser);
      } else {
        updateSignatureDetailsEdx(getUser);
      }
      if (getUser.salesforce) {
        console.log(20000);
        mountCode(popupContentDiv, getUser.signature);
      }
    })
    .catch((err) => {
      alert("Oops! An error occured. Please try again.");
      console.error(err);
    });
}

function mountCode(element, type) {
  const code = document.createElement("code");
  const hr = document.createElement("hr");
  const p = document.createElement("p");
  const copyBtn = document.querySelector("#copy-HTML");

  let minHtml = element.innerHTML
    .replace(/\r|\n|\r\n|\t|\s\s|(["])[\s]([a-z])/g, "$1$2")
    .replace(/id="lastname"|id="firstname"|id="title"/g, "");
  if (type === "2u") {
    minHtml = minHtml.replace(
      /id="pfirstName"|id="pLastName"|id="pronoun"|id="pJobTitle"|id="pOfficeNumber"|id="pOfficeAddress"/g,
      ""
    );
  }
  console.log(minHtml.length);
  code.innerText = minHtml;
  copyBtn.innerText = "Copy HTML";
  element.appendChild(hr);
  element.appendChild(code);
  p.innerHTML =
    minHtml.length <= 1333
      ? minHtml.length + " Characters 👍"
      : "⚠️ " +
        minHtml.length +
        " Characters - SF has a limit of 1333 &nbsp;⚠️" +
        '<br><a href="#" style="font-size:12px" onclick="alert(`Try removing some of the optional details.\r\nOtherwise, shorten the current details.`)">What should I do?</a>';
  element.appendChild(p);


}

export { mountSignature };
