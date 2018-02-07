import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../store/store";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { article: null };
    this.articleTitle = props.match.params.articleTitle;
  }

  componentDidMount(props) {
    // Load the article if user goes to a direct url
    this.getArticleByTitle(this.articleTitle);

    // Let the app know that the pageType has changed
    if (store.getState().pageType !== "article") {
      store.dispatch({
        type: "SET_PAGE_TYPE",
        payload: "article"
      });
    }
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
      return <p>No article found.</p>;
    } else {
      // Return HTML for article data
      return (
        // <div> doesn't trigger transition classes for some reason and <p> is not a good solution!
        <p>
          <Link to="/">&laquo; Back</Link>
          <h1>{this.state.article.title}</h1>
          £{this.state.article.price}
          <br />
          <div
            dangerouslySetInnerHTML={{ __html: this.state.article.content }}
          />
        </p>
      );
    }
  }
}
