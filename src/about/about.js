import React, { Component } from "react";
import store from "../store/store";
import AboutRender from "./About.render";

export default class extends Component {
  render() {
    return AboutRender(this);
  }
}
