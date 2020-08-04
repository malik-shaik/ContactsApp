import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser(); //eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name.toUpperCase()}</li>
      <li>
        {" "}
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>{" "}
        </a>{" "}
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1 id="logo">
        <i className="fas fa-address-book"></i>
        <span>ContactsApp</span>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
