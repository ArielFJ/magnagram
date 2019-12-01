import React, { Component } from "react";
import FileUpload from "./FileUpload";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light  ">
        <div
          className="collapse navbar-collapse sticky-top container"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li
              className="nav-item"
              id="allOption"
              onClick={this.props.onClick}
            >
              <a className="nav-link item" href="#" name="all">
                All
              </a>
            </li>
            <li
              className="nav-item active col-3"
              id="profileOption"
              onClick={this.props.onClick}
            >
              <a className="nav-link item" href="#" name="profile">
                Profile
              </a>
            </li>
            <li className="col-6">
              <FileUpload onUpload={this.props.onUpload} />
            </li>
            <li className="nav-item mt-4 col-4 fluid">
              <p>Upload your photo here</p>
            </li>
          </ul>

          <button onClick={this.props.signOut} className="btn btn-danger  ">
            Log Out
          </button>
        </div>
      </nav>
    );
  }
}

export default Nav;
