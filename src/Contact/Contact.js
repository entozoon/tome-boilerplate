import React, { Component } from "react";
import store from "../store/store";
import ContactRender from "./ContactRender";

export default class extends Component {
  componentDidMount(props) {
    // // Let the app know that the pageType has changed
    // if (store.getState().pageType !== "contact") {
    //   store.dispatch({
    //     type: "SET_PAGE_TYPE",
    //     payload: "contact"
    //   });
    // }
  }

  render() {
    return ContactRender(this);
  }
}
