import React, { Component } from "react";
import store from "../store/store";
import ContactRender from "./Contact.render";

export default class extends Component {
  render() {
    return ContactRender(this);
  }
}
