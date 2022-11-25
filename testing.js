const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(
  "4a579ff976173180b97f712c7dd71f92f9faee61bb762a6aec7af659e6332007"
);

const params = {
  engine: "google",
  q: "Coffee",
  tbm: "shop",
};

const callback = function (data) {
  console.log(data["shopping_results"]);
};

// Show result as JSON
search.json(params, callback);

// 4a579ff976173180b97f712c7dd71f92f9faee61bb762a6aec7af659e6332007
