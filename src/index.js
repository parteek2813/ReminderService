const express = require("express");
const { createChannel, subscribeMessage } = require("./utils/messageQueue");

const bodyParser = require("body-parser");
const TicketController = require("./controllers/ticket-controller");
const EmailService = require("./services/email-service");

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
  subscribeMessage(channel, EmailService.subcribedEvents, BINDING_KEY);

  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
    jobs();
  });
};

setupAndStartServer();
