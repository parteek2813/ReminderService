const sender = require("../config/email-config");
const TicketRepository = require("../repository/ticket-repository");

const repo = new TicketRepository();

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

const fetchPendingEmail = async (timestamp) => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log("Something went wrong in the service layer");
    console.log(error);
  }
};

const updateTicket = async (ticketId, data) => {
  try {
    const response = await repo.update(ticketId, data);
    return response;
  } catch (error) {
    console.log("Something went wrong in the service layer");
    console.log(error);
  }
};

const createNotification = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const subcribedEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_TICKET":
      await createNotification(data);
      break;
    case "SEND_BASIC_MAIL":
      await sendBasicEmail(data);
      break;
    default:
      console.log("No Valid event received");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmail,
  createNotification,
  updateTicket,
  subcribedEvents,
};
