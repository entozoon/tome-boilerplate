import React, { Component } from "react";
import Listing from "./Listing";
import store from "../store/store";

export default class extends Component {
  render() {
    // Only show listings on index
    let state = store.getState();

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
