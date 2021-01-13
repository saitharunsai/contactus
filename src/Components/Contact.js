import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      error: "",
      isVerified: false,
    };
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  isValidEmail(email) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  }

  validateField(field, value) {
    if (value.length <= 0) {
      return (
        <div className="alert alert-danger">
          <span className="text-capitalize">{field}</span> is required field.
        </div>
      );
    } else {
      if (field === "email") {
        if (!this.isValidEmail(value))
          return <div className="alert alert-danger">Invalid Email.</div>;
      } else {
        return "";
      }
    }
  }

  handleBlur(event) {
    this.setState({
      error: this.validateField(event.target.name, event.target.value),
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  }
  recaptchaLoaded() {
    console.log("capcha successfully loaded");
  }

  handleSubmit(event) {
    event.preventDefault();
    const newForm = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      message: this.state.message,
    };
    axios
      .post("http://localhost:5000/api/contactus", newForm)
      .then((res) => {
        console.log(res);
        this.setState({
          status: res.status,
        });
        this.props.history.push("/Analytics");
      })

      .catch(console.log);
  }
  render() {
    return (
      <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        <div className="card-header bg-transparent border-0 text-center">
          <h3>Contact from</h3>
        </div>
        <div className="card-body">
          {this.state.error}

          <form
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
            autoComplete="off"
          >
            <div className="form-group">
              <input
                name="firstName"
                type="text"
                className="form-control"
                placeholder="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                name="lastName"
                type="text"
                className="form-control"
                placeholder="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                required="required"
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                type="text"
                className="form-control"
                placeholder="Message"
                value={this.state.message}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                required="required"
              />
            </div>
            <p className="text-center mb-0">
              <Button type="submit" className="btn btn-primary w-100">
                Submit
              </Button>
            </p>
            <ReCAPTCHA
              sitekey="your site key"
              render="explicit"
              onloadCallback={this.recaptchaLoaded}
              verifyCallback={this.verifyallback}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
