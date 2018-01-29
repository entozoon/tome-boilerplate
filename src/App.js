import React, { Component } from "react";
// import Tome from "tome"; // <- When it's a node_module
import Tome from "./tome";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

// const Article = name => <div>{{ name }}</div>;
const Article = name => {
  console.log("If this is actually an article show it..?", name.match.params);

  return <div>If this is actually an article show it here</div>;
};

class App extends Component {
  constructor() {
    super();

    this.tome = new Tome();

    this.state = {
      header: this.tome.getHeader(),
      articles: this.tome.getArticles()
    };
    console.log("Articles::", this.state.articles);

    let string = "Satan's Revenge";
    console.log(this.tome.titleToUrl(string));
    console.log(this.tome.urlToTitle(this.tome.titleToUrl(string)));
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
  //   return this.renderArticle(this.tome.getArticleByTitle(title));
  // }

  // Return HTML for article data
  renderArticle(article, key) {
    return (
      <div key={key}>
        <a href="#" onClick={this.navClick}>
          {article.title}
        </a>
        <br />
        £{article.price}
        <br />
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    );
  }

  render() {
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

              <Route path={`/:articleId`} component={Article} />
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </div>
          </header>

          <main>
            <p>{this.state.header}</p>

            {/* <hr />
          <h2>Specific article 'glens-vodka':</h2>
        <div>{this.renderArticleByName("glens-vodka")}</div> */}

            <hr />
            <h2>All Articles:</h2>
            <div>{this.renderArticleListings()}</div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
