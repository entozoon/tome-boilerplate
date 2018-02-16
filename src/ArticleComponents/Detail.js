import React, { Component } from "react";
import DetailRender from "./Detail.render";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { article: null };
    this.articleTitle = props.match.params.articleTitle;
  }

  componentDidMount(props) {
    // Load the article if user goes to a direct url
    this.getArticleByTitle(this.articleTitle);
  }

  componentWillReceiveProps(props) {
    // Load article when clicking a link
    this.getArticleByTitle(props.match.params.articleTitle);
  }

  getArticleByTitle(title) {
    // If this is actually an article, set it as a state variable
    let article = this.props.tome.getArticleByTitle(title);
    this.setState({
      article: article
    });
  }

  render() {
    if (!this.state.article) {
      // Fun fact: The wrapper elements in these if/else must be the same as one another or the transition doesn't kick in properly (SIGH)
      return <div>No article found.</div>;
    } else {
      // Return HTML for article data
      return DetailRender(this, this.state.article);
    }
  }
}
