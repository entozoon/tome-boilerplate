import React, { Component } from "react";
import store from "../store/store";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    // Let the app know that the pageType has changed
    if (store.getState().pageType !== "contact") {
      store.dispatch({
        type: "SET_PAGE_TYPE",
        payload: "about"
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Contact</h1>
        <p>Contact me</p>
      </div>
    );
  }
}
