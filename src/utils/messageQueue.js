const amqplib = require("amqplib");

const EXCHANGE_NAME = "AIRLINE_BOOKING";
const BINDING_KEY = "REMINDER_SERVICE";
const MESSAGE_BROKER_URL = "ampq://localhost";

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL); //setup a connection to rabbitmq
    const channel = await connection.createChannel(); //create channel
    await channel.assertExchange(EXCHANGE_NAME, "direct", false); //setup distributor
    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue("QUEUE_NAME");

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("received data");
      console.log(msg.content.toString());
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue(QUEUE_NAME);
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message)); //mention publisher and what queue we have to send it to!
  } catch (error) {
    throw error;
  }
};

module.exports = {
  subscribeMessage,
  createChannel,
  publishMessage,
};
