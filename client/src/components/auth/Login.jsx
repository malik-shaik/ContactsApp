import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { AlertContext } from "../../context/alert/alertContext";

const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  const { setAlert } = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push("/");
    if (error === "Invalid credentials.") {
      setAlert(error, "danger");
      clearErrors();
    } //eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    email === "" || password === ""
      ? setAlert("Please fill all the fields", "danger")
      : login({ email, password });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>{" "}
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>

      <button
        className="btn btn-light btn-block"
        onClick={() => props.history.push("/forgotpassword")}
      >
        Forgot password ?
      </button>
    </div>
  );
};

export default Login;
