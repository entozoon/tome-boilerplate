import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    props.parent.setPageType("index");
  }
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Index Page</p>
      </div>
    );
  }
}
