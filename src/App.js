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

const Index = props => {
  props.parent.setPageType("index");
  return (
    <div>
      <h1>Welcome</h1>
      <p>Index Page</p>
    </div>
  );
};

const About = props => {
  props.parent.setPageType("about");
  return (
    <div>
      <h1>About</h1>
      <p>About Me</p>
    </div>
  );
};

// const Article = (name, _this) => {
class Article extends React.Component {
  constructor(props) {
    super();
    this.state = { article: null };
    this.articleTitle = props.match.params.articleTitle;
  }

  componentDidMount(props) {
    // Load the article if user goes to a direct url
    this.setArticleByTitle(this.articleTitle);
  }

  componentWillReceiveProps(props) {
    // Load article when clicking a link
    this.setArticleByTitle(props.match.params.articleTitle);
  }

  setArticleByTitle(title) {
    // If this is actually an article, set it as a state variable
    let article = tome.getArticleByTitle(title);
    this.setState({
      article: article
    });
    // Should be using REDUX for this stuff, tl;dr
    this.props.parent.setPageType("detail");
  }

  render() {
    if (!this.state.article) {
      return <p>No article found.</p>;
    } else {
      return renderArticle(this.state.article);
    }
  }
}

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

class App extends Component {
  constructor() {
    super();

    this.state = {
      pageType: "index",
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
    // Only show listings on index
    if (this.state.pageType === "index") {
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

  // // Get a specific article from the data
  // renderArticleByTitle(title) {
  //   return this.renderArticle(tome.getArticleByTitle(title));
  // }

  setPageType(pageType) {
    if (this.state.pageType != pageType) {
      this.setState({
        pageType: pageType
      });
    }
  }

  // reRender
  // Force a re-render via click event (avoid ofc)
  reRender(e) {
    this.setState({ renderFlop: !this.state.renderFlop });
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
                component={props => <Article {...props} parent={this} />}
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
