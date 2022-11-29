function copyElement(element, getUser) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  if (getUser.signature === "gs" || getUser.signature === "edx") {
    range.setStart(element, 0);
    range.setEnd(element, 1);
  }
  if (getUser.signature === "2u" && getUser.salesforce === true) {
    range.setStart(element, 0);
    range.setEnd(element, 1);
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
