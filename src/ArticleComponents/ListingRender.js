import React, { Component } from "react";
import { Link } from "react-router-dom";

export default (parent, article) => (
  <div className="article__listing">
    <Link to={article.url}>{article.title}</Link>
    <div>{parent.snippet(article.content, 20)}</div>
  </div>
);
