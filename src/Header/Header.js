import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" replace={true}>
                Index
              </Link>
            </li>
            <li>
              <Link to="/about" replace={true}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" replace={true}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <input
          placeholder="Search"
          onChange={event => {
            this.props.parent.search(event.target.value);
            this.props.parent.setLocation(this.props.location, "/");
          }}
        />
      </header>
    );
  }
}
