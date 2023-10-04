//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Each entry is a snapshot of my journey, whether it's a profound insight or a simple moment of joy. This section is a treasure trove of memories and introspection, providing me with a glimpse into my own growth and evolution.";
const aboutContent = "I define its purpose and significance. It's a canvas for my thoughts, a mirror of my emotions, and a compass for my goals. This journal is not just a book of words; it's a roadmap to self-discovery and personal growth. It's where I chart my dreams, aspirations, and the journey to becoming the best version of myself. This section offers a glimpse into the profound impact this journal has on my life.";
const contactContent = " I welcome connections and collaborations. Feel free to reach out to discuss shared interests, exchange ideas, or share your own experiences. Let's connect through the power of words and create meaningful connections within this journaling community.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose",);
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
