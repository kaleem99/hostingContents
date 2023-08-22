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
    this.url = window.location.href;
    this.pattern = /plugin%5Binteractivator%5D%5Bid%5D=([^&]+)/;
    this.videoID = this.url.match(this.pattern)[1];
    // this.videoID = "pxn2ycze9k";
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

      const pollOptionDiv = document.createElement("div");
      pollOptionDiv.className = "poll__option";
      if (this.selected == option) {
        pollOptionDiv.classList.add("poll__option--selected");
      }

      const pollOptionFillDiv = document.createElement("div");
      pollOptionFillDiv.className = "poll__option-fill";
      pollOptionFillDiv.style.width = data2[option] + "%";

      const pollOptionInfoDiv = document.createElement("div");
      pollOptionInfoDiv.className = "poll__option-info";

      const pollLabelSpan = document.createElement("span");
      pollLabelSpan.className = "poll__label";
      pollLabelSpan.textContent = option;

      const pollPercentageSpan = document.createElement("span");
      pollPercentageSpan.className = "poll__percentage";
      pollPercentageSpan.textContent = data2[option] + "%";

      pollOptionInfoDiv.appendChild(pollLabelSpan);
      pollOptionInfoDiv.appendChild(pollPercentageSpan);

      pollOptionDiv.appendChild(pollOptionFillDiv);
      pollOptionDiv.appendChild(pollOptionInfoDiv);

      fragment.appendChild(pollOptionDiv);

      // Now you can append the fragment to your desired container in the DOM
      // For example: document.body.appendChild(fragment);

      let x = document.getElementsByClassName("poll__option");
      console.log(x);
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

const p = new Poll(
  document.querySelector(".poll"),
  "Which communication situation or type of communication would make you most nervous in the Amazon scenario?"
);
