import React from "react";
import { Link } from "react-router-dom";

export default (parent, props) => (
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
        props.parent.search(event.target.value);
        props.parent.setLocation(this.props.location, "/");
      }}
    />
  </header>
);
