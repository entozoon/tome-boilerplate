import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderRender from "./Header.render";

export default class extends Component {
  render() {
    return HeaderRender(this, this.props);
  }
}
