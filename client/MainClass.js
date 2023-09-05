const firebaseConfig = {
  apiKey: "AIzaSyDESbLxNOAK7lOjUAtY5WIDO5jzEeqGKk8",
  authDomain: "interactivatorv2.firebaseapp.com",
  databaseURL: "https://interactivatorv2-default-rtdb.firebaseio.com",
  projectId: "interactivatorv2",
  storageBucket: "interactivatorv2.appspot.com",
  messagingSenderId: "812543921954",
  appId: "1:812543921954:web:f1deff47ef9e407a0edf7b",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const db = firebase.database();

class Poll {
  constructor(root, title) {
    this.root = root;
    this.selected = sessionStorage.getItem("poll-selected");
    this.endpoint = "https://express-template-backend.onrender.com/poll/";
    // this.videoID = "pg4ycfs4k7";
    this.url = window.location.href;
    this.pattern = /plugin%5Binteractivator%5D%5Bid%5D=([^&]+)/;
    this.videoID = this.url.match(this.pattern)[1];
    this.root.insertAdjacentHTML(
      "afterbegin",
      `<div class="poll__title">${title}</div>`
    );

    this._refresh();
  }

 async _refresh() {
    const reference = database.ref(`Polls/${this.videoID}`);
    reference
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this._renderOptions(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error reading data:", error);
      });
  }

  _renderOptions(data2) {
    const reference = database.ref(`Polls/${this.videoID}`);

    this.root.querySelectorAll(".poll__option").forEach((option) => {
      option.remove();
    });
    const total = Object.values(data2).reduce(
      (sum, value) => sum + value,
      0
    );

    for (const option in data2) {
      const template = document.createElement("template");
      const fragment = template.content;
      const percentage = ((data2[option] / total) * 100).toFixed(2);
      const voteText = data2[option] === 1 ? " vote" : " votes";
      template.innerHTML = `
      <div class="poll__option ${
        this.selected == option ? "poll__option--selected" : ""
      }">
        <div class="poll__option__outer" style="${
          this.selected == option ? "background: #cce896" : ""
        }">
          <div class="poll__option-fill" style="width: ${
            this.selected != null ? percentage : "0"
          }%;"><p class="votes">${
        this.selected != null ? data2[option] + voteText : ""
      }</p></div>
          </div>
        <div class="poll__option-info">
          <span class="poll__label">${option}</span>
          <span class="poll__percentage">${
            this.selected != null ? percentage : "0"
          }%</span>
        </div>
      </div>
    `;
      let x = document.getElementsByClassName("poll__option");
      if (!this.selected) {
        fragment
          .querySelector(".poll__option")
          .addEventListener("click", () => {
            const newData = { ...data2 };
            newData[option] += 1;
            reference
              .update(newData)
              .then(() => {
                console.log("Data updated successfully.");
                this.selected = option;
                sessionStorage.setItem("poll-selected", option);
                this._refresh();
              })
              .catch((error) => {
                console.error("Error updating data:", error);
              });
          });
      }

      this.root.appendChild(fragment);
    }
  }
}

let result = "";
const url = window.location.href;

const regex = /Video_Pausing_Embedded_Poll\((.*?)\);/;
const match = url.match(regex);

if (match) {
  const dataInsideFunctionCall = match[1].split(",").map((item) => item);
  result = decodeURIComponent(dataInsideFunctionCall[3]).replace(/"/g, "");
} else {
  result = "Generic Heading";
}

const p = new Poll(document.querySelector(".poll"), result);



