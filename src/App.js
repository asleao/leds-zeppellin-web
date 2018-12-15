import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProjectForm from "./components/projectForm";
import Projects from "./components/projects";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log(user);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/projects/:id" component={ProjectForm} />
            <Route
              path="/projects"
              render={props => <Projects {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/projects" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
