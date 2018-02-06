import React, { Component } from "react";
import Tome from "tome-of-the-unknown";
import "./App.css";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import {
  TransitionGroup,
  Transition,
  CSSTransitionGroup,
  CSSTransition
} from "react-transition-group";
import Header from "./Header/Header";
import ArticleListings from "./ArticleComponents/Listings";
import ArticleDetail from "./ArticleComponents/Detail";
import About from "./About/About";
import Contact from "./Contact/Contact";
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

  setLocation(location, target) {
    // location.push(target);
    location.pathname = target;
  }

  search(query) {
    store.dispatch({
      type: "SET_PAGE_TYPE",
      payload: "index"
    });

    // location.push("/");

    this.setState({
      articles: tome.searchArticlesByTitle(query)
    });
  }

  render() {
    return (
      <HashRouter basename={"/" + appDirectory ? appDirectory : ""}>
        <Route
          render={({ location }) => {
            // let locationKey = location.pathname.split("/")[1] || "/";
            let locationKey = location.pathname;

            // if (store.getState().pageType === "index") {
            //   location.pathname = "/";
            // }

            return (
              <div>
                <Header parent={this} location={location} />

                <main>
                  {/* Switch makes it so only the first matching Route is displayed */}
                  <TransitionGroup>
                    {/* https://github.com/reactjs/react-transition-group/issues/136#issuecomment-341386985 */}
                    {/* https://reactcommunity.org/react-transition-group/#Transition-prop-appear */}
                    <CSSTransition
                      key={locationKey}
                      classNames="fade"
                      timeout={2000}
                      appear={true}
                      exit={false}
                      component="div"
                    >
                      <Switch location={location}>
                        {/* When path is matched, Route returns a new given component */}
                        <Route
                          exact
                          path="/"
                          location={location}
                          render={() => (
                            <Index articles={this.state.articles} />
                          )}
                        />
                        {/* ^ a fancy comparable to component={Index} but pass props */}

                        <Route
                          exact
                          path="/about"
                          location={location}
                          component={About}
                        />
                        <Route
                          exact
                          path="/contact"
                          location={location}
                          component={Contact}
                        />
                        <Route
                          path={"/:articleTitle"}
                          location={location}
                          render={props => (
                            <ArticleDetail {...props} tome={tome} />
                          )}
                        />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </main>
              </div>
            );
          }}
        />
      </HashRouter>
    );
  }
}

export default App;
