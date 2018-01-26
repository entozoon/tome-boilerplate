// import React, { Component } from "react";
// export default class Graph extends Component {
let articles = require("../articles/articles-compiled.json");

export default class Tome {
  constructor() {
    console.log("Hey from Tome!");

    // this.articles = this.parseArticles(articles);
    this.articles = articles;
  }
  // Parse the JSON for the HTML content (remove /n newline and stuff)
  // parseArticles(articles) {
  //   console.log(articles);
  //   return articles.map(_ => {
  //     _.content = JSON.parse(_.content);
  //     return _;
  //   });
  // }
  getHeader() {
    return "Testing node_module concept";
  }
  getArticles() {
    return this.articles;
  }
  getArticleByName(name) {
    return this.articles.filter(_ => _.name === name)[0];
  }
}
