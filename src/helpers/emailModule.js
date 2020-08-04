const nodemailer = require("nodemailer");
const { serverEmailCredentials } = require("../config");

module.exports = (firstname, email, token) => {
  let transporter = nodemailer.createTransport({
    host: serverEmailCredentials.host,
    port: serverEmailCredentials.port,
    secure: false,
    auth: {
      user: serverEmailCredentials.email,
      pass: serverEmailCredentials.password,
    },
  });

  let mailOptions = {
    from: serverEmailCredentials.email,
    to: email,
    subject: "Reset Password link",
    text: `Hi ${firstname},
    Click the below link to reset your password.    
    http://localhost:5050/api/users/resetpass?token=${token}


    www.contactsapp.com
    `,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log("Error occured. Sending email FAILED.  ", err);
    else console.log("Email successfully sent.");
  });
};
