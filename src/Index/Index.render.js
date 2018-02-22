import React from "react";
import Listings from "../ArticleComponents/Listings";
import { Link } from "react-router-dom";

export default (parent, props) => (
  <div>
    <h1>Index</h1>

    <Listings articles={props.articles} tome={props.tome} />

    <p className="path">/src/Index/Index.js</p>
  </div>
);
