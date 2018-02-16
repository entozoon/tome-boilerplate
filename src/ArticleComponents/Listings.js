import React, { Component } from "react";
import Listing from "./Listing";

export default class extends Component {
  render() {
    // Use the articles array we have to create listing HTML for each
    return this.props.articles.map((article, i) => {
      return (
        <Listing
          key={i}
          article={article}
          className="article__listing"
          tome={this.props.tome}
        />
      );
    });
  }
}
