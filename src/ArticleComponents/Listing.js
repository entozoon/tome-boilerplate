import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListingRender from "./Listing.render";

export default class extends Component {
  render() {
    return ListingRender(this, this.props.tome, this.props.article);
  }
}
