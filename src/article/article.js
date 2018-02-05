import React, { Component } from "react";
import Tome from "tome-of-the-unknown";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import store from "../store/store";

// Return HTML for article data
const renderArticle = article => {
  return (
    <div>
      <Link to="/">&laquo; Back</Link>
      <h1>{article.title}</h1>
      £{article.price}
      <br />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { article: null };
    this.articleTitle = props.match.params.articleTitle;
  }

  componentDidMount(props) {
    // Load the article if user goes to a direct url
    this.setArticleByTitle(this.articleTitle);

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
    this.setArticleByTitle(props.match.params.articleTitle);
  }

  setArticleByTitle(title) {
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
      return renderArticle(this.state.article);
    }
  }
}
