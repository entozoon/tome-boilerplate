import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    return (
      <div className="article__listing">
        <Link to={this.props.article.url}>{this.props.article.title}</Link>
        <div>{this.snippet(this.props.article.content, 10)}</div>
      </div>
    );
  }
}
