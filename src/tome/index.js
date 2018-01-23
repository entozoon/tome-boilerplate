// import React, { Component } from "react";
// export default class Graph extends Component {
var articles = require("../articles/articles-compiled.json");

export default class Tome {
  constructor() {
    console.log("Hey from Tome!");
  }
  getHeader() {
    return "Testing node_module concept";
  }
  getArticles() {
    return articles;
  }
}
