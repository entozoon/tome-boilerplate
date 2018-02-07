import React, { Component } from "react";
import store from "../store/store";

export default class extends Component {
  componentDidMount(props) {
    // Let the app know that the pageType has changed
    if (store.getState().pageType !== "about") {
      store.dispatch({
        type: "SET_PAGE_TYPE",
        payload: "about"
      });
    }
  }

  render() {
    return (
      <div>
        <h1>About</h1>
        <p>About Me</p>
      </div>
    );
  }
}
