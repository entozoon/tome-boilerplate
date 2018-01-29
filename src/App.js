import React, { Component } from "react";
import Tome from "tome"; // <- When it's a node_module
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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
    super();
    // If this is actually an article, show it.

    this.article = tome.getArticleByTitle(name.match.params.articleTitle);
    console.log("hello");
    console.log(this);
    console.log(name);
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
      page: "home"
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

  render() {
    let articleLinksOrWhatever = this.state.articles.map((article, i) => {
      return (
        <li key={i}>
          <Link to={article.url}>{article.title}</Link>
        </li>
      );
    });

    return (
      <Router>
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
                <Route
                  path={`/:articleTitle`}
                  component={Article}
                  passUp={this.passUp}
                />
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
              </Switch>
            </div>
          </header>

          <main>
            <p>{this.state.header}</p>

            {/* <hr />
          <h2>Specific article 'glens-vodka':</h2>
        <div>{this.renderArticleByName("glens-vodka")}</div> */}

            <hr />
            <h2>All Articles:</h2>
            {/* <div>{this.renderArticleListings()}</div> */}
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
