import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListingRender from "./ListingRender";

export default class extends Component {
  // Snippet
  // Strip html tags and shorten by given length
  snippet(html, length) {
    return (
      html
        .replace(/(<([^>]+)>)/gi, "")
        .substring(0, length)
        .trim() + "..."
    );
  }

  render() {
    return ListingRender(this, this.props.article);
  }
}
