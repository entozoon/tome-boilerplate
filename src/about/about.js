import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    props.parent.setPageType("about");
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
