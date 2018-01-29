import React, { Component } from "react";
import Tome from "tome"; // <- When it's a node_module
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

// const Article = name => <div>{{ name }}</div>;
const Article = name => {
  // console.log("If this is actually an article show it..?", name.match.params.articleTitle);
  let article = tome.getArticleByTitle(name.match.params.articleTitle);
  console.log(article);

  return renderArticle(article);
};

// Return HTML for article data
const renderArticle = (article, key) => {
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
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      header: tome.getHeader(),
      articles: tome.getArticles()
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

  render() {
    let articleLinksOrWhatever = this.state.articles.map((article, i) => {
      return (
        <Link key={i} to={article.url}>
          {article.title}
        </Link>
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

              <Route path={`/:articleTitle`} component={Article} />
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
            {/* <div>{this.renderArticleListings()}</div> */}
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
