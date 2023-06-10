const express = require("express");

const bodyParser = require("body-parser");
const TicketController = require("./controllers/ticket-controller");
const sendBasicEmail = require("./services/email-service");

const jobs = require("./utils/job");
const PORT = 3004;
const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);
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
