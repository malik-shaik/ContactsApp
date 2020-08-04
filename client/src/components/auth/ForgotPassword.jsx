import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sentEmailMessage, setSentEmailMessage] = useState(null);

  const { resetPasswordEmail } = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    resetPasswordEmail(email);
    setSentEmailMessage(
      "Email sent you with a link to reset your password. Please check your inbox."
    );
  };

  return (
    <div className="form-container">
      {sentEmailMessage ? (
        <div>{sentEmailMessage}</div>
      ) : (
        <form>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
            <input
              type="submit"
              value="Send email"
              className="btn btn-primary btn-block"
              onClick={onSubmit}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
