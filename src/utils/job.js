const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/email-config");

/**
 * 10:00 am
 * every 5minutes
 * We will check are there any pending emails which wa expected
 * to be sent by now and is pending
 *
 */

const setupJobs = () => {
  cron.schedule("*/1 * * * *", async () => {
    const response = await emailService.fetchPendingEmail();
    response.forEach((email) => {
      sender.sendMail(
        {
          // from: mailFrom,
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(error);
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: "SUCESS" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
