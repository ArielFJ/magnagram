import React, { Component } from "react";

class RegistrationForm extends Component {
  constructor() {
    super();

    this.renderForm = this.renderForm.bind(this);
  }

  renderForm() {
    if (this.props.form === "registration") {
      return (
        <form className="mt-4">
          <div className="form-group">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              aria-describedby="emailHelp"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="pw">Password</label>
            <input
              type="password"
              className="form-control"
              id="pw"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.props.createAccount}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-danger ml-4"
            onClick={() => this.props.changeForm("none")}
          >
            Back
          </button>

          <div id="message" className="mt-4"></div>
        </form>
      );
    } else if (this.props.form === "sign") {
      return (
        <form className="mt-4">
          <div className="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label for="pw">Password</label>
            <input
              type="password"
              className="form-control"
              id="pw"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.props.signIn}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-danger ml-4"
            onClick={() => this.props.changeForm("none")}
          >
            Back
          </button>

          <div id="message" className="mt-4"></div>
        </form>
      );
    }
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default RegistrationForm;
