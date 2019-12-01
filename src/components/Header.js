import React, { Component } from "react";
import Nav from "./Nav";

class Header extends Component {
  constructor() {
    super();

    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    if (this.props.user || this.props.form === "options") {
      return (
        <header className="header">
          <h1 className="display-2">MagnaGram</h1>
          <img
            width="50"
            src={this.props.user.photoURL}
            alt="Profile"
            className="mb-4"
          />
          <span className="display-4"> {this.props.user.displayName}</span>

          <Nav
            onClick={this.props.navClick}
            signOut={this.props.signOut}
            changeForm={this.props.changeForm}
            onUpload={this.props.onUpload}
          />
        </header>
      );
    } else if (this.props.form !== "none") {
      return (
        <header className="header">
          <h1 className="display-2">MagnaGram</h1>
          <h2 className="display-4">Please, fill the fields below</h2>
        </header>
      );
    } else {
      return (
        <header className="header">
          <h1 className="display-2">MagnaGram</h1>
          <nav className="nav container justify-content-center d-flex">
            <button
              onClick={() => this.props.changeForm("sign")}
              className="btn btn-secondary mb-2 "
            >
              Sign In
            </button>
            <button
              onClick={() => this.props.changeForm("registration")}
              target="_blank"
              className="btn btn-secondary mb-2 ml-2"
            >
              Create Account
            </button>
            <button
              onClick={this.props.logInWithGoogle}
              className="btn btn-primary mb-2 ml-2"
            >
              Sign In with Google
            </button>
          </nav>
        </header>
      );
    }
  }

  render() {
    return <div>{this.renderHeader()}</div>;
  }
}

export default Header;
