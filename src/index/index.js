import React, { Component } from "react";
import store from "../store/store";
import ArticleListings from "../ArticleComponents/Listings";

export default class extends Component {
  componentDidMount(props) {
    // // Let the app know that the pageType has changed
    // if (store.getState().pageType !== "index") {
    //   store.dispatch({
    //     type: "SET_PAGE_TYPE",
    //     payload: "index"
    //   });
    // }
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Index Page</p>

        <ArticleListings articles={this.props.articles} />
      </div>
    );
  }
}
