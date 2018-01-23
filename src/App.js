import React, { Component } from "react";
// import Tome from "tome"; // <- When it's a node_module
import Tome from "./tome";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    let tome = new Tome();
    console.log(tome);
    this.state = {
      header: tome.getHeader(),
      articles: tome.getArticles()
    };
    console.log(this.state.articles);
  }
  render() {
    return (
      <div>
        <header>
          <h1>Tome Use Example</h1>
        </header>
        <main>
          <p>{this.state.header}</p>
        </main>
      </div>
    );
  }
}

export default App;
