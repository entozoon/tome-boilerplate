"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import React, { Component } from "react";
// export default class Graph extends Component {
var _ = require("lodash");

var Tome = function () {
  function Tome(props) {
    _classCallCheck(this, Tome);

    console.log("Hey from Tome!");

    // this.articles = require(props.articlesPath); // FUCK SAKE https://github.com/webpack/webpack/issues/4921
    // this.articles = require(`${props.articlesPath}`);
    this.articles = require("../../../src/articles/articles-compiled.json");

    this.articles = this.createArticleLinks(this.articles);
  }

  _createClass(Tome, [{
    key: "getHeader",
    value: function getHeader() {
      return "Testing node_module concept";
    }
  }, {
    key: "getArticles",
    value: function getArticles() {
      return this.articles;
    }
  }, {
    key: "createArticleLinks",
    value: function createArticleLinks(articles) {
      var _this = this;

      articles = articles.map(function (article) {
        article.url = "/" + _this.titleToUrl(article.title);
        return article;
      });
      return articles;
    }

    // Satan's Revenge -> "satans-revenge"

  }, {
    key: "titleToUrl",
    value: function titleToUrl(title) {
      // Satan's Revenge -> "Satan%27s%20Revenge"
      // return encodeURIComponent(str).replace(/[!'()*]/g, escape);

      // Satan's Revenge
      var url = title;

      //   // Satan's-Revenge
      //   .replace(/ /g, "-")
      //   // satan's-revenge
      //   .toLowerCase();

      // // satan's-revenge
      // url = encodeURIComponent(title);
      // console.log(url);

      // // satan%27s-revenge
      // url = title.replace(/[!'()*]/g, escape);

      // satans-revenge
      url = _.kebabCase(url);

      return url;
    }
  }, {
    key: "getArticleByTitle",
    value: function getArticleByTitle(title) {
      // return this.articles.filter(_ => _.title === title)[0];
      // Actually, be more vague about it, matching the kebab cases
      return this.articles.filter(function (x) {
        return _.kebabCase(x.title) === _.kebabCase(title);
      })[0];
    }
  }]);

  return Tome;
}();

exports.default = Tome;