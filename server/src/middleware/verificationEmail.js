// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript;
const sgMail = require("@sendgrid/mail");

const sendVerificationEmail = async (email, token) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const verificationLink = `http://localhost:5000/user/verify/${token}`;

  const msg = {
    to: email, // Change to your recipient
    from: "mahmoud0122549@gmail.com", // Change to your verified sender
    subject: "Verify TYPA store account",
    html: `
    <p style="font-size:1.75rem; font-weight:600;text-align:center;">
    Thanks for signing up with Typa Store!    
    </p>
    <p style="font-size:1.25rem; font-weight:500;text-align:center;">
    To get started, please click the button below 👇🏾 to complete your registration.
    </p>    
    <a href="${verificationLink}" style="background-color: #ec981a; color: white; padding: 10px 20px; text-decoration: none; display: block; border-radius: 5px;text-align:center;width:fit-content;margin:0 auto;">Verify Email</a>
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      // console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendVerificationEmail };
