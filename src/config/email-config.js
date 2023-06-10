const nodemailer = require("nodemailer");

const EMAIL_ID = "samplesm46@gmail.com";
const EMAIL_PASS = "dehnzcxchqscnwrd";

const sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASS,
  },
});

module.exports = sender;
