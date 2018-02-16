import React from "react";
import { Link } from "react-router-dom";

export default (parent, tome, article) => (
  <div className="article__listing">
    <Link to={article.url}>{article.title}</Link>
    <div>{tome.snippet(article.content, 20)}</div>
  </div>
);
