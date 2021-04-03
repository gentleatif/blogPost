const express = require("express");
const ejs = require("ejs");
const lodash = require("lodash");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("view/partials engine", "ejs");
const homeStartingContent =
  "home ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const about =
  "Lorem about ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contact =
  "Contact Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const postItem = [];

const constItem = {
  title: "Home",
  body: homeStartingContent,
};

postItem.push(constItem);

app.get("/", function (req, res) {
  res.render("index", { postItems: postItem });
});
app.get("/home", function (req, res) {
  res.render("home", { postItems: postItem });
});
app.get("/about", function (req, res) {
  res.render("about", { abouts: about, heading: "About" });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contact: contact, heading: "Contact" });
});
app.post("/compose", function (req, res) {
  var post = {
    title: lodash.upperFirst(req.body.postTitle),
    body: req.body.postBody,
  };
  postItem.push(post);

  res.redirect("/");
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:topic", function (req, res) {
  let urlTitle = "";
  // user has clicked on read more for this content details  note this is in lowerCase from ejs u can see

  urlTitle = req.params.topic;

  // putting all the allTitle of postItem i.e home item in allTitle
  const allTitle = [];

  postItem.forEach((positem, i) => {
    allTitle.push(lodash.lowerCase(postItem[i].title));
  });
  // for finding index no in postItem of that item that user clicked on for readmore

  if (allTitle.includes(urlTitle)) {
    const findObjInArray = function (postItem, urlTitle) {
      const index = postItem.findIndex(function (item, index) {
        return item.title.toLowerCase() === urlTitle.toLowerCase();
      });
      return postItem[index].body;
    };
    let body = findObjInArray(postItem, urlTitle);
    const urlContent = {
      title: lodash.upperFirst(urlTitle),
      body: body,
    };
    const singleContent = [];
    singleContent.push(urlContent);

    console.log("Match found");

    res.render("post", { postItems: singleContent }); // yahi pe  ek item hi dalna hain
  } else {
    res.render("index", { postItems: postItem });
    console.log("Nothing is there like this ");
  }
});
app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("server is running on port : 3000");
});
