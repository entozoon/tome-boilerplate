import React, { Component } from "react";
import Tome from "tome-of-the-unknown"; // <- When it's a node_module
import "./App.css";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

let appDirectory = "tome-boilerplate"; // this may typically be null, if on a custom domain

if (process.env.NODE_ENV === "development") {
  // No subdir if localhost
  appDirectory = "/";
}

const tome = new Tome();

const Home = () => (
  <div>
    <h1>Home page</h1>
  </div>
);

const About = () => (
  <div>
    <h1>About</h1>
  </div>
);

// const Article = (name, _this) => {
class Article extends React.Component {
  constructor(name) {
    console.log("article");
    super();
    // If this is actually an article, show it.
    this.article = tome.getArticleByTitle(name.match.params.articleTitle);
  }
  render() {
    if (!this.article) {
      // Need to be using REDUX for this stuff, tl;dr
      // this.props.passUp("home");
      return <p>No article found.</p>;
    } else {
      // this.props.passUp("detail");
      return renderArticle(this.article);
    }
  }
}

// Return HTML for article data
const renderArticle = article => {
  return (
    <div>
      <a href="#" onClick={this.navClick}>
        {article.title}
      </a>
      <br />
      £{article.price}
      <br />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      header: tome.getHeader(),
      articles: tome.getArticles(),
      renderFlop: false
    };
    console.log("Articles::", this.state.articles);

    // console.log(tome.titleToUrl("Satan's Revengencer"));
    // console.log(tome.getArticleByTitle("Article Name"));
    // console.log(tome.getArticleByTitle("Article Name Other's And Stuff"));
  }

  navClick(e) {
    console.log("No idea how to handle navigation yet, maybe react-router");
  }

  // Use the articles array we have to create listing HTML for each
  renderArticleListings() {
    return this.state.articles.map((article, i) => {
      return this.renderArticle(article, i);
    });
  }

  // // Get a specific article from the data
  // renderArticleByTitle(title) {
  //   return this.renderArticle(tome.getArticleByTitle(title));
  // }

  passUp() {
    console.log("pass up");
  }

  // reRender
  // Force a re-render via click event (avoid ofc)
  reRender(e) {
    this.setState({ renderFlop: !this.state.renderFlop });
  }

  render() {
    console.log("render");

    let articleLinksOrWhatever = this.state.articles.map((article, i) => {
      return (
        <li key={i}>
          <Link to={article.url} onClick={this.reRender.bind(this)}>
            {article.title}
          </Link>
        </li>
      );
    });
    return (
      <HashRouter basename={"/" + appDirectory ? appDirectory : ""}>
        <div>
          <header>
            <h1>Tome Use Example</h1>

            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </nav>

              <nav>
                <ul>{articleLinksOrWhatever}</ul>
              </nav>

              {/* Switch makes it so only the first matching Route is displayed */}
              <Switch>
                {/* When path is matched, Route returns a new given component */}
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route
                  path={"/:articleTitle"}
                  component={Article}
                  passUp={this.passUp}
                />
              </Switch>
            </div>
          </header>

          <main>
            <p>{this.state.header}</p>
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;
