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
      `<div class="poll__title">Title Input</div>`
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
          console.log(data);
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

    for (const option in data2) {
      const template = document.createElement("template");
      const fragment = template.content;
      template.innerHTML = `
        <div class="poll__option ${
          this.selected == option ? "poll__option--selected" : ""
        }">
          <div class="poll__option-fill" style="width: ${
            data2[option]
          }%;"></div>
          <div class="poll__option-info">
            <span class="poll__label">${option}</span>
            <span class="poll__percentage">${data2[option]}%</span>
          </div>
        </div>
      `;
      let x = document.getElementsByClassName("poll__option");
      console.log(x, 74, this.videoID, this.selected);
      if (!this.selected) {
        console.log(100000);
        console.log(this.videoID);
        fragment
          .querySelector(".poll__option")
          .addEventListener("click", () => {
            console.log(20000, this.videoID);
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

const p = new Poll(
  document.querySelector(".poll"),
  "Which communication situation or type of communication would make you most nervous in the Amazon scenario?"
);
