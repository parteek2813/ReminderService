const express = require("express");
const { createChannel, subscribeMessage } = require("./utils/messageQueue");

const bodyParser = require("body-parser");
const TicketController = require("./controllers/ticket-controller");
const sendBasicEmail = require("./services/email-service");

const jobs = require("./utils/job");
const BINDING_KEY = "REMINDER_SERVICE";
const PORT = 3004;

const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // const channel = await createChannel();

  app.post("/api/v1/tickets", TicketController.create);

  const channel = await createChannel();
  subscribeMessage(channel, undefined, BINDING_KEY);

  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
    jobs();
    // sendBasicEmail(
    //   "support@admin.com",
    //   "sarcaxx9999@gmail.com",
    //   "This is a testing Email",
    //   "Hey, how are you, I hope you like the support"
    // );

    // cron.schedule("*/2 * * * *", () => {
    //   console.log("running a task every two minutes");
    // });
  });
};

setupAndStartServer();
