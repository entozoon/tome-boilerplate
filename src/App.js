import React, { Component } from "react";
// import Tome from "tome"; // <- When it's a node_module
import Tome from "./tome";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.tome = new Tome();

    this.state = {
      header: this.tome.getHeader(),
      articles: this.tome.getArticles()
    };
    console.log("Articles::", this.state.articles);
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
  // renderArticleByName(name) {
  //   return this.renderArticle(this.tome.getArticleByName(name));
  // }

  // Return HTML for article data
  renderArticle(article, key) {
    return (
      <div key={key}>
        <a href="#" onClick={this.navClick}>
          {article.title} ({article.name})
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
      <div>
        <header>
          <h1>Tome Use Example</h1>
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
    );
  }
}

export default App;
