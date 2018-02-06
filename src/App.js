import React, { Component } from "react";
import Tome from "tome-of-the-unknown";
import "./App.css";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import {
  TransitionGroup,
  Transition,
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

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames="fade">
    {children}
  </CSSTransition>
);

const tome = new Tome();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageType: "index",
      articles: tome.getArticles(),
      renderFlop: false,
      test: false
    };
    console.log("Articles::", this.state.articles);

    store.subscribe(() => {
      this.setState({
        renderFlop: !this.state.renderFlop
      });
    });

    setInterval(() => {
      this.setState({ test: !this.state.test });
    }, 5000);
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
    let testItems = [1, 2, 3].map((dwa, i) => {
      return <p>right {i}</p>;
    });

    return (
      <HashRouter basename={"/" + appDirectory ? appDirectory : ""}>
        <Route
          render={({ location }) => {
            // let locationKey = location.pathname.split("/")[1] || "/";
            let locationKey = location.pathname;
            console.log(locationKey);

            return (
              <div>
                <Header search={this.search.bind(this)} />
                {/*
              <TransitionGroup>
                {testItems.map((item, i) => (
                  <Fade key={item}>
                    <div>
                      {item}
                      <button onClick={() => this.handleRemove(i)}>
                        &times;
                      </button>
                    </div>
                  </Fade>
                ))}
              </TransitionGroup> */}

                <main>
                  {/* <TransitionGroup>
                  <CSSTransition
                    key={1}
                    classNames="example"
                    timeout={{ enter: 500, exit: 300 }}
                  >
                    <h1>Random dwa</h1>
                  </CSSTransition>
                  <CSSTransition
                    key={2}
                    classNames="example"
                    timeout={{ enter: 500, exit: 300 }}
                  >
                    <h1>Random dwafwgdh</h1>
                  </CSSTransition>
                </TransitionGroup> */}

                  {/* Switch makes it so only the first matching Route is displayed */}
                  <TransitionGroup>
                    {/* key={location.key} */}
                    {/* https://github.com/reactjs/react-transition-group/issues/136#issuecomment-341386985 */}
                    {/* https://reactcommunity.org/react-transition-group/#Transition-prop-appear */}
                    <CSSTransition
                      key={locationKey}
                      classNames="fade"
                      timeout={2000}
                      appear={true}
                      exit={false}
                    >
                      {/* <Transition
                    key={location.pathname.split("/")[1] || "/"}
                    timeout={2000}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    onEnter={node => {
                      console.log("enter", node);
                    }}
                    onExit={node => {
                      console.log("exit", node);
                    }}
                  > */}
                      <Switch location={location}>
                        {/* When path is matched, Route returns a new given component */}
                        <Route
                          exact
                          path="/"
                          location={location}
                          component={props => (
                            <div>
                              <Index />
                              <ArticleListings articles={this.state.articles} />
                            </div>
                          )}
                        />
                        {/* component={Index} */}
                        {/* ^ a fancy way of writing component={Index} to pass props */}
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
                          component={props => (
                            <ArticleDetail
                              {...props}
                              parent={this}
                              tome={tome}
                            />
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
