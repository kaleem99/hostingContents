function copyElement(element, getUser, buttonId) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  console.log(getUser.signature);
  console.log(getUser.salesforce);
  if (
    (getUser.signature === "edx" || getUser.signature === "gs") &&
    getUser.salesforce === true &&
    buttonId === "copy-signature"
  ) {
    // range.setStart(element, 1);
    range.setEnd(element, 4);
  }
  if (getUser.signature === "2u") {
    range.setStart(element, 0);
    range.setEnd(element, 1);
  }
  if (getUser.signature === "gs" && getUser.salesforce === undefined) {
    element.innerHTML += "<br><br><br><p></p>";
    range.setEnd(element, 3);
    range.setStart(element, 0);
  }
  selection.addRange(range);
  document.execCommand("copy");
}

function initCopyNotification(element) {
  const currentText = element.innerText;
  element.classList.add("copied");
  element.innerHTML =
    '<span style="line-height:12px">📋</span> Copied to clipboard!';
  const removeNotification = setTimeout(() => {
    element.classList.remove("copied");
    element.innerText = currentText;
    clearTimeout(removeNotification);
  }, 3000);
}

export { copyElement, initCopyNotification };
