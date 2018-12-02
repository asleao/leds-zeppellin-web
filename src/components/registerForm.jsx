import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    email: Joi.string()
      .required()
      .label("Email")
      .email(),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    password_confirmation: Joi.string()
      .min(5)
      .required()
      .label("Confirme o password")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.data["token"]);
      window.location = "/";
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };

        if (ex.response.data["username"]) {
          errors.username = ex.response.data["username"];
        }

        if (ex.response.data["email"]) {
          errors.email = ex.response.data["email"];
        }

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput(
            "password_confirmation",
            "Confirme o password",
            "password"
          )}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
