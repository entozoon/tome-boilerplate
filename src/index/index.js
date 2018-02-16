import React, { Component } from "react";
import Listings from "../ArticleComponents/Listings";

export default class extends Component {
  render() {
    return (
      <div>
        <h1>Index</h1>

        <Listings articles={this.props.articles} tome={this.props.tome} />

        <p className="path">/src/Index/Index.js</p>
      </div>
    );
  }
}
