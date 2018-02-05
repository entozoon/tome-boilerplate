import React, { Component } from "react";
import Tome from "tome-of-the-unknown";
import "./App.css";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import Article from "./article/article";
import About from "./about/about";
import Index from "./index/index";
import store from "./store/store";

let appDirectory = "tome-boilerplate"; // this may typically be null, if on a custom domain

if (process.env.NODE_ENV === "development") {
  // No subdir if localhost
  appDirectory = "/";
}

const tome = new Tome();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageType: "index",
      articles: tome.getArticles(),
      renderFlop: false
    };
    console.log("Articles::", this.state.articles);

    store.subscribe(() => {
      this.setState({
        renderFlop: !this.state.renderFlop
      });
    });
  }

  // Use the articles array we have to create listing HTML for each
  renderArticleListings() {
    // Only show listings on index
    let state = store.getState();

    if (state.pageType === "index") {
      return this.state.articles.map((article, i) => {
        return (
          <div key={i} className="article__listing">
            <Link to={article.url}>{article.title}</Link>
            <div>{this.snippet(article.content, 10)}</div>
          </div>
        );
      });
    }
  }

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

  search(event) {
    let query = event.target.value;

    store.dispatch({
      type: "SET_PAGE_TYPE",
      payload: "index"
    });
    this.setState({
      articles: tome.searchArticlesByTitle(query)
    });
  }

  render() {
    return (
      <HashRouter basename={"/" + appDirectory ? appDirectory : ""}>
        <div>
          <header>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Index</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </nav>
              <input placeholder="Search" onChange={this.search.bind(this)} />
            </div>
          </header>

          <main>
            {/* Switch makes it so only the first matching Route is displayed */}
            <Switch>
              {/* When path is matched, Route returns a new given component */}
              <Route
                exact
                path="/"
                component={props => <Index {...props} parent={this} />}
              />
              {/* ^ a fancy way of writing component={Index} to pass props */}
              <Route
                exact
                path="/about"
                component={props => <About {...props} parent={this} />}
              />
              <Route
                path={"/:articleTitle"}
                component={props => (
                  <Article {...props} parent={this} tome={tome} />
                )}
              />
            </Switch>

            <nav>{this.renderArticleListings()}</nav>
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;
