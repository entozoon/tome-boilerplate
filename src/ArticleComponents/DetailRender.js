import React, { Component } from "react";
import { Link } from "react-router-dom";

export default (parent, article) => (
  <div>
    <Link to="/">&laquo; Back</Link>
    <div className="article__detail">
      <h1>{article.title}</h1>
      £{article.price}
      <br />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  </div>
);
