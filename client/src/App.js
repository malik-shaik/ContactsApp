import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { ContactProvider } from "./context/contacts/contactContext";
import { AuthProvider } from "./context/auth/authContext";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { AlertProvider } from "./context/alert/alertContext";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/privateroutes/PrivateRoute";

import "./App.css";
import ForgotPassword from "./components/auth/ForgotPassword";

const App = () => {
  return (
    <AuthProvider>
      <ContactProvider>
        <AlertProvider>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route
                    exact
                    path="/forgotpassword"
                    component={ForgotPassword}
                  />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </ContactProvider>
    </AuthProvider>
  );
};

export default App;
