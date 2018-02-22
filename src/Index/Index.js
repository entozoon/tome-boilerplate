import React, { Component } from "react";
import IndexRender from "./Index.render";

export default class extends Component {
  render() {
    return IndexRender(this, this.props);
  }
}
