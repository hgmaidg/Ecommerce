const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { response } = require("express");

// sgMail.setApiKey(process.env.MAILAPI_KEY);
// const sendEmail = asyncHandler(async (data, req, res) => {
//   const transporter = sgMail.createTransport({
//     // host: "smtp.gmail.com",
//     // port: 465,
//     // secure: true,
//     // auth: {
//     //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     //   user: process.env.MAIL_ID,
//     //   pass: process.env.MAIL_PASS,
//     // },
//   });

//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendEmail({
//       from: '"Fred Foo 👻" <sneakify@gmail.com>', // sender address
//       to: data.to, // list of receivers
//       subject: data.subject, // Subject line
//       text: data.text, // plain text body
//       html: data.html, // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//   }
// });

// const sendEmail = asyncHandler(async (data, req, res) => {
//   const sgMail = require("@sendgrid/mail");
//   sgMail.setApiKey(process.env.MAILAPI_KEY);
//   const msg = {
//     from: '"Fred Foo 👻" <sneakify.shop.vn@gmail.com>', // sender address
//     to: data.to, // list of receivers
//     subject: data.subject, // Subject line
//     text: data.text, // plain text body
//     html: data.html, // html body
//   };
//   //ES6
//   sgMail.send(msg).then(
//     () => {},
//     (error) => {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response.body);
//       }
//     }
//   );
//   //ES8
//   (async () => {
//     try {
//       await sgMail.send(msg);
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response.body);
//       }
//     }
//   })();
// });

sgMail.setApiKey(process.env.MAILAPI_KEY);
const sendEmail = asyncHandler(async (data, req, res) => {
  const message = {
    to: data.to,
    from: "sneakify.shop.vn@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  try {
    await sgMail.send(message);
    console.log("Email sent 00");
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = sendEmail;
