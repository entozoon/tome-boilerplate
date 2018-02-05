import React, { Component } from "react";
import Tome from "tome-of-the-unknown";
import "./App.css";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import Header from "./Header/Header";
import ArticleDetail from "./ArticleComponents/Detail";
import ArticleListings from "./ArticleComponents/Listings";
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
          <Header search={this.search.bind(this)} />

          <main>
            {/* Switch makes it so only the first matching Route is displayed */}
            <Switch>
              {/* When path is matched, Route returns a new given component */}
              <Route exact path="/" component={Index} />
              <Route exact path="/about" component={About} />} />
              <Route
                path={"/:articleTitle"}
                component={props => (
                  <ArticleDetail {...props} parent={this} tome={tome} />
                )}
              />
              {/* ^ a fancy way of writing component={Index} to pass props */}
            </Switch>

            <ArticleListings articles={this.state.articles} />
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;
