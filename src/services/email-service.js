const sender = require("../config/email-config");

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  // sendMail actually returns a promise
  try {
    sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendBasicEmail;
