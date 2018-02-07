import React, { Component } from "react";
import store from "../store/store";
import AboutRender from "./AboutRender";

export default class extends Component {
  render() {
    return AboutRender(this);
  }
}
