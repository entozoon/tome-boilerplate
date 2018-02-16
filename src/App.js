import React, { Component } from "react";
import Tome from "tome-of-the-unknown";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import {
  TransitionGroup,
  //Transition,
  CSSTransition
} from "react-transition-group";
import Header from "./Header/Header";
import ArticleDetail from "./ArticleComponents/Detail";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Index from "./Index/Index";
import store from "./store/store";

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
    // store.dispatch({
    //   type: "SET_PAGE_TYPE",
    //   payload: "index"
    // });

    // location.push("/");

    this.setState({
      articles: tome.searchArticlesByTitle(query)
    });
  }

  render() {
    return (
      <HashRouter basename="/">
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
                    {/* https://codesandbox.io/s/43v5wj62q9?from-embed */}
                    <CSSTransition
                      key={locationKey}
                      classNames="fade"
                      timeout={250}
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
                            <Index articles={this.state.articles} tome={tome} />
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
